import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CalendareService, UserCredentialRequest } from '../../api';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsernameInput } from '../dialog-username-input/dialog-username-input';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorDialogProvider } from '../a9uitemplate/dialog-error/error-dialog-provider';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cal-create-credential-button',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    TranslocoDirective,
  ],
  host: {
    '[class.mini]': 'mini()'
  },
  templateUrl: './create-credential-button.html',
  styleUrl: './create-credential-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCredentialButton {
  public username = input.required<string>();
  public mini = input(false, { transform: booleanAttribute });
  public refresh = output<boolean>();

  readonly dialog = inject(MatDialog);
  usernameDialog(credentialType: string, usernameLabel: string) {
    const dialogRef = this.dialog.open(DialogUsernameInput, {
      data: { username: '', usernameLabel: usernameLabel },
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        await this.#createCredential(credentialType, null, result);
      }
    });
  }

  async createCredential(credentialType: string, preselect: string) {
    return await this.#createCredential(credentialType, preselect, null);
  }

  private readonly confirmDialog = inject(ConfirmDialogProvider);
  private readonly errorDialog = inject(ErrorDialogProvider);
  private transloco = inject(TranslocoService);
  async #createCredential(credentialType: string, preselect: string | null, accesskey: string | null) {
    try {
      const request: UserCredentialRequest = {
        credentialType: credentialType
      };
      if (preselect) {
        request.template = preselect;
      } else {
        request.username = accesskey;
      }
      const secret = await this.createSecret();
      if (secret) {
        request.password = secret;
      }
      await firstValueFrom(this.client.createCredential(this.username(), request));
      const _answer = await this.confirmDialog.ask({
        title: this.transloco.translate(`Credential created`),
        intro: this.transloco.translate('Credential created INTRO'),
        body: request.password,
        question: this.transloco.translate('Have you secured the password?'),
        confirmOnly: true,
      });
      this.refresh.emit(true);
    }
    catch (e) {
      const err = e as HttpErrorResponse;
      if (err) {
        if (err.status === 400) {
          console.warn('Error creating credential %o', err);
          this.errorDialog.show({
            title: this.transloco.translate(`Credential not created`),
            body: this.transloco.translate('Credential not created BODY')
          });
        }
        // const _answer=await this.errorDialog.show()
      } else {
        console.error('Error creating credential %o', e);
      }
    }
  }

  private readonly client = inject(CalendareService);
  async createSecret(length: number | null = null): Promise<string | null> {
    try {
      const secret = await firstValueFrom(this.client.createRandomSecret(length ? length : undefined));
      return secret?.secret ?? null;
    }
    catch (e) {
      console.error('Error creating credential %o', e);
    }
    return null;
  }
}
