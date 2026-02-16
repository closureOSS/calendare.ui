import { inject, Injectable } from '@angular/core';
import { DialogErrorData } from './dialog-error-data';
import { MatDialog } from '@angular/material/dialog';
import { DialogError } from './dialog-error';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogProvider {
  readonly dialog = inject(MatDialog);
  private isActive = false;

  public show(data: DialogErrorData) {
    if (this.isActive) {
      return;
    }
    const dialogRef = this.dialog.open(DialogError, {
      data: {
        title: data.title ?? 'Error',
        body: data.body,
      },
      panelClass: 'a9-dialog-error',
    });
    this.isActive = true;
    dialogRef.afterClosed().subscribe(async result => {
      this.isActive = false;
      if (result !== undefined) {
        ;
      }
    });
  }
}
