import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { LookupPrincipal } from '../widgets/lookup-principal/lookup-principal';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api/services';
import {
  GroupMemberRef, GroupRef, MembershipDirection,
  MembershipGroupRequest, MembershipMemberRequest, MembershipPrivilegeType, MembershipRequest, PrincipalResponse
} from '../../api';
import { firstValueFrom } from 'rxjs';
import { TranslocoDirective } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { HttpProblemDetails } from '../core/http-problem-details';
import { HttpErrorOnSave } from '../a9uitemplate/http-error-on-save/http-error-on-save';
import { httpErrorToProblemDetails } from '../core/http-error-helper';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { matRestartAltOutline, matCancelFillOutline, matRestoreFromTrashFillOutline } from '@ng-icons/material-symbols/outline';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';
import { hlmH4 } from '@spartan-ng/helm/typography';

@Component({
  selector: 'cal-edit-members',
  imports: [
    HlmCardImports,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmItemImports,
    NgIcon,
    HttpResourceViewer,
    NavigateBackButton,
    IconPrincipalType,
    LookupPrincipal,
    HintBox,
    HttpErrorOnSave,
    TranslocoDirective,
  ],
  viewProviders: [
    provideIcons({
      matRestartAltOutline,
      matCancelFillOutline,
      matRestoreFromTrashFillOutline,
    }),
  ],
  templateUrl: './edit-members.html',
})
export class EditMembers {
  protected hlmGroup = hlmH4;
  public username = input.required<string>();
  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);

  public readonly memberships = this.calendareResource.getMemberships(this.username, MembershipDirection.Members, { defaultValue: { memberships: [], groups: [] } });

  public dirty = linkedSignal({
    source: this.memberships.status,
    computation: (data) => data !== 'resolved'
  });

  refresh() {
    this.memberships.reload();
  }

  private readonly confirm = inject(ConfirmDialogProvider);
  public async confirmCancel(): Promise<boolean> {
    if (!this.dirty()) return true;
    return await this.confirm.ask();
  }

  private readonly location = inject(LocationStrategy);
  back() {
    this.location.back();
  }

  protected formMessage = signal<HttpProblemDetails | null>(null);
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
      this.formMessage.set(httpErrorToProblemDetails(e));
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
    // console.log('Adding to group %o -> %o', group, principal);
    const exists = group.members?.find(p => p.username === principal.username);
    if (exists) {
      if (exists.membershipType === MembershipPrivilegeType.Unassigned) {
        exists.membershipType = group.group?.membershipType;
      }
      return; // nothing to do, principal already in list
    }
    this.dirty.set(true);
    this.formMessage.set(null);
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
