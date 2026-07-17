import { Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CalendareResource } from '../../api/resources';
import { CredentialResponse } from '../../api/models';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { httpErrorToProblemDetails } from '../core/http-error-helper';
import { ErrorDialogProvider } from '../a9uitemplate/dialog-error/error-dialog-provider';
import { DialogCredentialCreated } from '../dialog-credential-created/dialog-credential-created';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'cal-view-credentials',
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpResourceViewer,
    RouterLink,
    TranslocoDirective,
],
  templateUrl: './view-credentials.html',
  styleUrl: './view-credentials.scss',
})
export class ViewCredentials {
  public username = input.required<string>();
  public reload = input<number>(0);
  readonly dialog = inject(MatDialog);
  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);

  public principal = computed(() => {
    const username = this.username();
    return username ? username : undefined;
  });

  public readonly credentials = this.calendareResource.getCredentialsOfUser(this.username, { defaultValue: [] });

  private _refreshInternal = effect(() => {
    if (this.reload()) {
      this.refresh();
    }
  })

  private refresh() {
    this.credentials.reload();
  }

  private readonly errorDialog = inject(ErrorDialogProvider);

  async lockMode(credential: CredentialResponse, doLock: boolean) {
    if (credential === null || !credential.subject) {
      return;
    }
    try {
      if (doLock) {
        await firstValueFrom(this.client.lockCredential(this.username(), credential.subject, credential.credentialType?.label ?? undefined));
      } else {
        await firstValueFrom(this.client.unlockCredential(this.username(), credential.subject, credential.credentialType?.label ?? undefined));
      }
      this.refresh();
    }
    catch (e) {
      const pd = httpErrorToProblemDetails(e);
      console.error('Error locking %s credential: %o %o', doLock, credential, pd);
      this.errorDialog.show({
        title: this.transloco.translate(`Lock not changed`),
        body: this.transloco.translate(pd.title ?? '')
      });
    }
  }

  async renewCredential(credential: CredentialResponse) {
    if (credential === null || !credential.subject) {
      return;
    }
    const answer = await this.confirmDialog.ask({
      title: this.transloco.translate('Renew appkey credential'),
      intro: this.transloco.translate('Renew appkey credential consequences'),
    });
    if (answer === false) {
      return;
    }
    try {
      const newCredential = await firstValueFrom(this.client.setCredentialPassword(this.username(), credential.subject!, undefined, credential.credentialType?.label ?? undefined));
      // console.log('Changed password %o: %o', credential, response);
      const ref = this.dialog.open(DialogCredentialCreated, {
        data: {
          credential: newCredential,
        },
        width: '90%',
        maxWidth: '980px'
      });
      const _answer = await firstValueFrom(ref.afterClosed());
      this.refresh();
    }
    catch (e) {
      const pd = httpErrorToProblemDetails(e);
      console.error('Error renewing appkey credential: %o %o', credential, pd);
      this.errorDialog.show({
        title: this.transloco.translate(`Application credential not renewed`),
        body: this.transloco.translate(pd.title ?? '')
      });
    }
  }

  private readonly transloco = inject(TranslocoService);
  private readonly confirmDialog = inject(ConfirmDialogProvider);
  async deleteCredential(credential: CredentialResponse) {
    if (credential === null || !credential.subject) {
      return;
    }
    const answer = await this.confirmDialog.ask({
      title: this.transloco.translate('Delete credential'),
      intro: this.transloco.translate('Delete credential consequences'),
    });
    if (answer === false) {
      return;
    }
    try {
      await firstValueFrom(this.client.deleteCredential(this.username(), credential.subject, credential.credentialType?.label ?? undefined));
      this.refresh();
    }
    catch (e) {
      const pd = httpErrorToProblemDetails(e);
      console.error('Error deleting credential: %o %o', credential, pd);
      this.errorDialog.show({
        title: this.transloco.translate(`Credential not deleted`),
        body: this.transloco.translate(pd.title ?? '')
      });
    }
  }

  protected now = new Date();
}
