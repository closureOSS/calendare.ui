import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpErrorHandler } from '../core/http-error-handler';
import { MatListModule } from '@angular/material/list';
import { LookupPrincipal } from '../widgets/lookup-principal/lookup-principal';
import { PrincipalRef } from '../widgets/principal-ref/principal-ref';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api/services';
import {
  GroupMemberRef, GroupRef, MembershipDirection,
  MembershipGroupRequest, MembershipMemberRequest, MembershipPrivilegeType, MembershipRequest, PrincipalResponse
} from '../../api';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';

@Component({
  selector: 'cal-edit-members',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HttpResourceViewer,
    MatListModule,
    ActionBar,
    NavigateBackButton,
    LookupPrincipal,
    PrincipalRef,
    TranslocoDirective,
  ],
  templateUrl: './edit-members.html',
  styleUrl: './edit-members.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditMembers {
  public username = input.required<string>();
  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);

  public readonly memberships = this.calendareResource.getMemberships(this.username, MembershipDirection.Members);

  constructor() {
    const httpErrorHandler = inject(HttpErrorHandler);
    effect(() => {
      const error = this.memberships.error();
      httpErrorHandler.standardErrorHandler(error);
    });

    effect(() => {
      if (this.memberships.status() === 'resolved') {
        this.dirty.set(false);
      }
    });
  }

  public dirty = signal<boolean>(false);

  private readonly confirm = inject(ConfirmDialogProvider);
  public async confirmCancel(): Promise<boolean> {
    if (!this.dirty()) return true;
    return await this.confirm.ask();
  }

  private readonly location = inject(LocationStrategy);
  back() {
    this.location.back();
  }

  refresh() {
    this.memberships.reload();
  }

  async submit() {
    const request = this.memberships.value()?.groups?.map(g => {
      return {
        uri: g.group?.uri,
        members: g.members?.map(m => {
          return {
            uri: m.uri,
            membershipType: m.membershipType
          } as MembershipMemberRequest
        })
      } as MembershipGroupRequest
    });
    // console.log('Submit members %o -> %o', this.memberships()?.groups, { groups: request });
    try {
      await firstValueFrom(this.client.createMemberships({ groups: request } as MembershipRequest));
      this.refresh();
    }
    catch (e) {
      const pd = e as HttpErrorResponse;
      if (pd) {
        console.error('Error %d: %o', pd.status, pd);
        // this.formMessage.set(pd.detail ?? 'Saving changes failed');
      } else {
        console.error('Unknown error while amending collection: %o', e);
        // this.formMessage.set('Saving changes failed (reason unknown)');
      }
    }
  }

  public remove(member: GroupMemberRef, group: GroupRef) {
    // console.log('Removing from group %o -> %o', group, member);
    this.dirty.set(true);
    if (member.isVirtual) {
      const idx = group.members?.findIndex(m => m.username == member.username) ?? -1;
      if (idx > -1) {
        group.members?.splice(idx, 1);
      }
    } else {
      member.membershipType = member.membershipType === MembershipPrivilegeType.Unassigned ? group.group?.membershipType : MembershipPrivilegeType.Unassigned;
    }
  }

  public add(principal: PrincipalResponse, group: GroupRef) {
    console.log('Adding to group %o -> %o', group, principal);
    const exists = group.members?.find(p => p.username === principal.username);
    if (exists) {
      if (exists.membershipType === MembershipPrivilegeType.Unassigned) {
        exists.membershipType = group.group?.membershipType;
      }
      return; // nothing to do, principal already in list
    }
    this.dirty.set(true);
    group.members ??= [];
    group.members.push({
      displayname: principal.displayName,
      principalType: principal.principalType?.label,
      uri: principal.uri!,
      username: principal.username,
      membershipType: group.group?.membershipType,
      isVirtual: true,
    });
    const otherGroups = this.memberships.value()?.groups?.filter(grp => grp.group?.uri !== group?.group?.uri);
    for (const og of otherGroups ?? []) {
      const hasSameMember = og.members?.find(m => m.username === principal.username);
      if (hasSameMember) {
        hasSameMember.membershipType = MembershipPrivilegeType.Unassigned;
      }
    }
  }
}
