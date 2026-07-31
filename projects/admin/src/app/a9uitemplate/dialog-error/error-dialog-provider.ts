import { inject, Service } from '@angular/core';
import { DialogErrorData } from './dialog-error-data';
import { DialogError } from './dialog-error';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { firstValueFrom } from 'rxjs';

@Service()
export class ErrorDialogProvider {
  private readonly dialog = inject(HlmDialogService);

  private isActive = false;

  public async show(data: DialogErrorData) {
    if (this.isActive) {
      return;
    }
    const dialogRef = this.dialog.open(DialogError, {
      context: {
        data: {
          title: data.title ?? 'Error',
          body: data.body,
        },
      },
      contentClass: 'sm:!max-w-[320px] text-white bg-red-700 p-8',
      showCloseButton: false,
      disableClose: false,
      role: 'alertdialog',
    });
    this.isActive = true;
    const result = await firstValueFrom(dialogRef.closed$);
    this.isActive = false;
    // console.log('Closed with %o', result);

    // return result as boolean;
  }
}
