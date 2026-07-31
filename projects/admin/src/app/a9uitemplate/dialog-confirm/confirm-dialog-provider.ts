import { inject, Service } from '@angular/core';
import { DialogConfirmContent } from './dialog-confirm-content';
import { DialogConfirm } from './dialog-confirm';
import { firstValueFrom } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { HlmDialogService } from '@spartan-ng/helm/dialog';


@Service()
export class ConfirmDialogProvider {
  private readonly dialog = inject(HlmDialogService);
  private readonly transloco = inject(TranslocoService);

  public async ask(content: Partial<DialogConfirmContent> | null = null): Promise<boolean> {
    const ref = this.dialog.open(DialogConfirm, {
      context: {
        data: {
          title: content?.title ?? this.transloco.translate('Abort editing'),
          intro: content?.intro ?? this.transloco.translate('Your unsaved changes will be lost.'),
          body: content?.body ?? null,
          question: content?.question ?? this.transloco.translate('Do you want that?'),
          confirmOnly: content?.confirmOnly ?? false,
        }
      },
      contentClass: 'sm:!max-w-[80%]',
      showCloseButton: false,
      disableClose: true,
    });

    const result = await firstValueFrom(ref.closed$);
    // console.log('Closed with %o', result);
    return result as boolean;
  }
}
