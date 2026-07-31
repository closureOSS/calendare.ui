import { inject, Service } from '@angular/core';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { firstValueFrom } from 'rxjs';
import { CredentialCreateResponse, UserCredentialCreateTemplate } from '../../api';
import { DialogCredentialCreated } from './dialog-credential-created';

@Service()
export class CredentialDialogProvider {
  private readonly dialog = inject(HlmDialogService);

  private isActive = false;

  public async show(credential: CredentialCreateResponse, template: UserCredentialCreateTemplate | null = null) {
    if (this.isActive) {
      return;
    }
    const dialogRef = this.dialog.open(DialogCredentialCreated, {
      context: {
        data: {
          credential: credential,
          template: credential.credentialType ?? template,
        },
      },
      contentClass: 'sm:!max-w-[80%] min-w-sm',
      showCloseButton: false,
      disableClose: true,
      role: 'alertdialog',
    });
    this.isActive = true;
    const result = await firstValueFrom(dialogRef.closed$);
    this.isActive = false;
    // console.log('Closed with %o', result);

    // return result as boolean;
  }
}
