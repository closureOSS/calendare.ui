import { Component, inject } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { DialogErrorData } from './dialog-error-data';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';

@Component({
  selector: 'a9-dialog-error',
  imports: [
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmAlertDialogImports,
  ],
  host: {
    class: 'flex flex-col gap-6',
  },
  templateUrl: './dialog-error.html',
})
export class DialogError {
  protected readonly _dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{ data: DialogErrorData }>();
  protected readonly data = this._dialogContext.data;
}
