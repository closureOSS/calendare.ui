import { Component, inject } from '@angular/core';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { DialogConfirmContent } from './dialog-confirm-content';
import { HlmButtonGroupImports } from "@spartan-ng/helm/button-group";
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'a9-dialog-confirm',
  imports: [
    HlmDialogImports,
    HlmButtonGroupImports, HlmButtonImports,
    TranslocoDirective,
  ],
  // host: {
  // 	class: 'flex flex-col gap-4',
  // },
  templateUrl: './dialog-confirm.html',
})
export class DialogConfirm {
  protected readonly _dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{ data: DialogConfirmContent }>();
  protected readonly data = this._dialogContext.data;
}
