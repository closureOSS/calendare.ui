import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DialogPasswordInput } from '../dialog-password-input/dialog-password-input';
import { MatDialog } from '@angular/material/dialog';
import { CalendareResource } from '../../api/resources';
import { CredentialResponse } from '../../api/models';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';

@Component({
  selector: 'cal-view-credentials',
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HttpResourceViewer,
    TranslocoDirective,
  ],
  templateUrl: './view-credentials.html',
  styleUrl: './view-credentials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  public readonly credentials = this.calendareResource.getCredentialsOfUser(this.username);

  private _refreshInternal = effect(() => {
    if (this.reload()) {
      this.refresh();
    }
  })

  private refresh() {
    this.credentials.reload();
  }

  async lock(credential: CredentialResponse, doLock: boolean) {
    if (credential === null || credential.id === null) {
      return;
    }
    try {
      if (doLock) {
        await firstValueFrom(this.client.lockCredential(this.username(), credential.id!));
      } else {
        await firstValueFrom(this.client.unlockCredential(this.username(), credential.id!));
      }
      this.refresh();
    }
    catch (e) {
      console.error('Error locking credential %o: %o', credential, e);
    }
  }

  passwordDialog(credential: CredentialResponse) {
    const dialogRef = this.dialog.open(DialogPasswordInput, {
      data: { username: credential.subject, password: '' },
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        try {
          await firstValueFrom(this.client.setCredentialPassword(this.username(), credential.id!, { username: credential.subject, password: result }));
          // console.log('Changed password %o: %o', credential, response);
          this.refresh();
        }
        catch (e) {
          // TODO: Show error
          console.error('Error changing password %o: %o', credential, e);
        }
      }
    });
  }

  private readonly transloco = inject(TranslocoService);
  private readonly confirmDialog = inject(ConfirmDialogProvider);
  async deleteCredential(credential: CredentialResponse) {
    if (credential === null || credential.id === null) {
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
      await firstValueFrom(this.client.deleteCredential(this.username(), credential.id!));
      this.refresh();
    }
    catch (e) {
      console.error('Error deleting credential %o: %o', credential, e);
    }
  }

}
