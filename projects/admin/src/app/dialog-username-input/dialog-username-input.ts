import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogPasswordInput } from '../dialog-password-input/dialog-password-input';
import { PasswordData } from '../dialog-password-input/password-data';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'cal-dialog-username-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    TranslocoDirective,
  ],
  templateUrl: './dialog-username-input.html',
  styleUrl: './dialog-username-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogUsernameInput {
  readonly dialogRef = inject(MatDialogRef<DialogPasswordInput>);
  readonly data = inject<PasswordData>(MAT_DIALOG_DATA);
  readonly username = model(this.data.username);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
