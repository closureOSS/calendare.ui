import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DialogErrorData } from './dialog-error-data';

@Component({
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
  ],
  templateUrl: './dialog-error.html',
  styleUrl: './dialog-error.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogError {
  readonly data = inject<DialogErrorData>(MAT_DIALOG_DATA);
}
