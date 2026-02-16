import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmContent } from './dialog-confirm-content';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  imports: [
    MatButtonModule,
    MatDialogModule,
    TranslocoDirective,
  ],
  templateUrl: './dialog-confirm.html',
  styleUrls: ['./dialog-confirm.scss']
})
export class DialogConfirm {
  data = inject<DialogConfirmContent>(MAT_DIALOG_DATA);
}
