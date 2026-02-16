import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmContent } from './dialog-confirm-content';
import { DialogConfirm } from './dialog-confirm';
import { firstValueFrom } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogProvider {
  private readonly dialog = inject(MatDialog);
  private readonly transloco = inject(TranslocoService);

  public async ask(content: Partial<DialogConfirmContent> | null = null): Promise<boolean> {
    const ref = this.dialog.open(DialogConfirm, {
      data: {
        title: content?.title ?? this.transloco.translate('Abort editing'),
        intro: content?.intro ?? this.transloco.translate('Your unsaved changes will be lost.'),
        body: content?.body ?? null,
        question: content?.question ?? this.transloco.translate('Do you want that?'),
        confirmOnly: content?.confirmOnly ?? false,
      }
    });
    const result = await firstValueFrom(ref.afterClosed());
    return result as boolean;
  }
}
