import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PasswordData } from './password-data';
import { TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: 'cal-dialog-password-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    TranslocoDirective
],
  templateUrl: './dialog-password-input.html',
  styleUrl: './dialog-password-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPasswordInput {
  readonly dialogRef = inject(MatDialogRef<DialogPasswordInput>);
  readonly data = inject<PasswordData>(MAT_DIALOG_DATA);
  readonly password = model(this.data.password);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
