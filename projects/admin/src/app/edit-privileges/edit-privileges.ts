import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LookupPrincipal } from "../widgets/lookup-principal/lookup-principal";
import { PrincipalRef } from '../widgets/principal-ref/principal-ref';
import { CalendareService } from '../../api/services';
import { CalendareResource } from '../../api/resources';
import { firstValueFrom } from 'rxjs';
import {
  PrincipalResponse, PrivilegeGroupRequest,
  PrivilegeGroupResponse, PrivilegeLineResponse, PrivilegePrincipalRequest, PrivilegeRequest
} from '../../api/models';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective } from '@jsverse/transloco';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { LocationStrategy } from '@angular/common';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { MatCardModule } from '@angular/material/card';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { HttpProblemDetails } from '../core/http-problem-details';
import { HttpErrorOnSave } from '../a9uitemplate/http-error-on-save/http-error-on-save';
import { httpErrorToProblemDetails } from '../core/http-error-helper';

@Component({
  selector: 'cal-edit-privileges',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpResourceViewer,
    PrincipalRef,
    LookupPrincipal,
    NavigateBackButton,
    ActionBar,
    HintBox,
    HttpErrorOnSave,
    TranslocoDirective,
  ],
  templateUrl: './edit-privileges.html',
  styleUrl: './edit-privileges.scss',

})
export class EditPrivileges {
  public username = input.required<string>();
  public grantorUri = input<string>();
  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);
  grantor = computed(() => this.grantorUri() ?? `/${this.username()}/`);

  public readonly privileges = this.calendareResource.getPrivilegesOutgoing(this.grantor, true, false);

  public dirty = linkedSignal({
    source: this.privileges.status,
    computation: (data) => data !== 'resolved'
  });

  refresh() {
    this.privileges.reload();
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
    const request = {
      grantorUri: this.grantor(),
      groups: this.privileges.value()?.privilegeGroups?.map(g => {
        return {
          code: g.code,
          principals: g.privileges?.map(m => {
            return {
              username: m.username,
              doRemove: m.isIndirect
            } as PrivilegePrincipalRequest
          }),
        } as PrivilegeGroupRequest
      }),
    } as PrivilegeRequest;
    console.log('Submit privileges %o -> %o', this.privileges.value(), request);
    try {
      await firstValueFrom(this.client.createPrivileges(request));
      // await this.client.api.privilege.post(request);
      this.refresh();
    }
    catch (e) {
      this.formMessage.set(httpErrorToProblemDetails(e));
    }
  }

  public remove(priv: PrivilegeLineResponse, group: PrivilegeGroupResponse) {
    console.log('Removing from group %o -> %o', group, priv);
    this.dirty.set(true);
    if (priv.isVirtual) {
      const idx = group.privileges?.findIndex(m => m.username === priv.username) ?? -1;
      if (idx > -1) {
        group.privileges?.splice(idx, 1);
      }
    } else {
      priv.isIndirect = !priv.isIndirect;
    }
  }

  public add(principal: PrincipalResponse, group: PrivilegeGroupResponse) {
    console.log('Adding to group %o -> %o', group, principal);
    const exists = group.privileges?.find(p => p.username === principal.username);
    if (exists) {
      if (exists.isIndirect) {
        exists.isIndirect = false;
      }
      return; // nothing to do, principal already in list
    }
    this.dirty.set(true);
    group.privileges ??= [];
    group.privileges.push({
      uri: principal.uri, username: principal.username, displayname: principal.displayName,
      principalType: principal.principalType?.label,
      isIndirect: false,
      isVirtual: true,
    });
    const otherGroups = this.privileges.value()?.privilegeGroups?.filter(grp => grp.code !== group?.code && grp.code !== 'C');
    for (const og of otherGroups ?? []) {
      const hasSameMember = og.privileges?.find(m => m.username === principal.username);
      console.log(og, hasSameMember);
      if (hasSameMember) {
        hasSameMember.isIndirect = true;
      }
    }
  }
}
