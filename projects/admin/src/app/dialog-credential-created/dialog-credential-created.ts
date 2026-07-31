import { Component, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { DialogCredentialCreatedContent } from './dialog-credential-created-content';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { hlmCode } from '@spartan-ng/helm/typography';

@Component({
  imports: [
    HlmButtonImports,
    HlmAlertDialogImports,
    TranslocoDirective,
  ],
  host: {
    class: 'flex flex-col gap-2',
  },
  templateUrl: './dialog-credential-created.html',
})
export class DialogCredentialCreated {
  hlmLead = ``;
  hlmSecret = `${hlmCode} break-all p-4 cursor-pointer`;
  hlmQuestion = `font-medium my-2`;
  protected readonly _dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
  private readonly _dialogContext = injectBrnDialogContext<{ data: DialogCredentialCreatedContent }>();
  protected readonly data = this._dialogContext.data;

  async writeClipboardText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  }
}
