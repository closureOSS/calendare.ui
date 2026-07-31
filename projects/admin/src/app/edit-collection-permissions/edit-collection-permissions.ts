import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { EditPermissions } from '../widgets/edit-permissions/edit-permissions';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { CollectionSubType, PermissionRequest, PrivilegeMask } from '../../api/models';
import { CalendareService } from '../../api/services';
import { CalendareResource } from '../../api/resources';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LocationStrategy } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matRestartAltOutline } from '@ng-icons/material-symbols/outline';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'cal-edit-collection-permissions',
  imports: [
    NavigateBackButton,
    EditPermissions,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmCardImports,
    NgIcon,
    TranslocoDirective,
  ],
  providers: [
    provideIcons({
      matRestartAltOutline,
    }),
  ],
  templateUrl: './edit-collection-permissions.html',
})
export class EditCollectionPermissions {
  public username = input.required<string>();
  public uri = input.required<string>();

  readonly transloco = inject(TranslocoService);
  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);
  public collection = this.calendareResource.getPermissions(this.uri);

  public globalPermitSelf = linkedSignal(() => this.collection.value()?.globalPermitSelf ?? PrivilegeMask._0);
  public authorizedProhibit = linkedSignal(() => this.collection.value()?.authorizedProhibit ?? PrivilegeMask._0);
  public ownerProhibit = linkedSignal(() => this.collection.value()?.ownerProhibit ?? PrivilegeMask._0);

  public dirty = computed(() => {
    if (this.collection.value()) {
      if ((this.collection.value()?.globalPermitSelf ?? PrivilegeMaskConstant.None) !== this.globalPermitSelf()) {
        return true;
      }
      if ((this.collection.value()?.authorizedProhibit ?? PrivilegeMaskConstant.None) !== this.authorizedProhibit()) {
        return true;
      }
      if ((this.collection.value()?.ownerProhibit ?? PrivilegeMaskConstant.None) !== this.ownerProhibit()) {
        return true;
      }
    }
    return false;
  });

  private readonly confirm = inject(ConfirmDialogProvider);
  public async confirmCancel(): Promise<boolean> {
    if (!this.dirty()) return true;
    return await this.confirm.ask();
  }

  public filter = computed(() => {
    const collection = this.collection.value();
    if (!collection) {
      return PrivilegeMask._0 | PrivilegeMaskConstant.None;
    }
    let filter: PrivilegeMask = PrivilegeMask._0 | PrivilegeMaskConstant.None;
    switch (collection.collectionType) {
      case 'Addressbook':
        filter |= PrivilegeMaskConstant.Bind | PrivilegeMaskConstant.Unbind |
          PrivilegeMaskConstant.ScheduleDeliver | PrivilegeMaskConstant.ScheduleSend | PrivilegeMaskConstant.ReadFreeBusy;
        break;

      case 'Calendar':
        filter |= PrivilegeMaskConstant.Bind | PrivilegeMaskConstant.Unbind;
        break;

      default:
      case 'Collection':
        if (collection.collectionSubType === CollectionSubType.Default) {
          filter |= PrivilegeMaskConstant.Bind | PrivilegeMaskConstant.Unbind |
            PrivilegeMaskConstant.ScheduleDeliver | PrivilegeMaskConstant.ScheduleSend | PrivilegeMaskConstant.ReadFreeBusy;
        }
        break;
    }
    // console.log(collection);
    return filter;
  });

  private readonly location = inject(LocationStrategy);
  back() {
    this.location.back();
  }

  public refresh() {
    this.collection.reload();
  }

  async submit() {
    try {
      await firstValueFrom(this.client.setPermissions({
        uri: this.collection.value()?.uri,
        globalPermitSelf: this.globalPermitSelf(),
        authorizedProhibit: this.authorizedProhibit(),
        ownerProhibit: this.ownerProhibit(),
      } as PermissionRequest));
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
}
