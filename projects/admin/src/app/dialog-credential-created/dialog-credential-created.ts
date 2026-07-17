import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoDirective } from '@jsverse/transloco';
import { DialogCredentialCreatedContent } from './dialog-credential-created-content';

@Component({
  imports: [
    MatButtonModule, MatDialogModule,
    TranslocoDirective,],
  templateUrl: './dialog-credential-created.html',
  styleUrl: './dialog-credential-created.scss',
})
export class DialogCredentialCreated {
  data = inject<DialogCredentialCreatedContent>(MAT_DIALOG_DATA);

  async writeClipboardText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  }
}
