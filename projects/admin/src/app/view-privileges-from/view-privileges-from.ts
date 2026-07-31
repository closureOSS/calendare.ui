import { booleanAttribute, Component, computed, inject, input } from '@angular/core';
import { ListPrivileges } from '../widgets/list-privileges/list-privileges';
import { CalendareResource } from '../../api/resources';
import { PrivilegeGroupResponse } from '../../api/models';
import { CalendareService } from '../../api';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { TranslocoService } from '@jsverse/transloco';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'cal-view-privileges-from',
  imports: [
    HlmCardImports,
    HttpResourceViewer,
    ListPrivileges,
  ],
  templateUrl: './view-privileges-from.html',
})
export class ViewPrivilegesFrom {
  public username = input.required<string>();
  public editable = input<boolean>(false, { transform: booleanAttribute });
  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);


  private readonly confirmDialog = inject(ConfirmDialogProvider);

  public grantee = computed(() => {
    const username = this.username();
    return username ? username : undefined;
  });

  public readonly privileges = this.calendareResource.getPrivilegesIncoming(this.grantee);

  private refresh() {
    this.privileges.reload();
  }

  private readonly transloco = inject(TranslocoService);
  public async refuse(priv: PrivilegeGroupResponse) {
    console.log('Refuse privilege received from %o', priv);
    if (!this.editable()) {
      return;
    }
    if (priv === null || priv.privileges === null || priv.privileges?.length === 0) {
      return;
    }
    const x = priv.privileges?.at(0);
    if (!x || !x.uri) {
      return;
    }
    const answer = await this.confirmDialog.ask({
      title: this.transloco.translate('Refuse granted privilege'),
      intro: this.transloco.translate(`Access to the *resource will no longer be possible.`, { resource: x.displayname }),
      question: this.transloco.translate('Are you sure?')
    });
    if (answer !== true) {
      return;
    }
    try {
      await firstValueFrom(this.client.deletePrivileges(this.username(), x.uri));
      // await this.client.api.privilege.grants.delete({
      //   queryParameters: {
      //     grantor: x.uri,
      //     grantee: this.username(),
      //   }
      // });
      this.refresh();
    }
    catch (e: unknown) {
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
