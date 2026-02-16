import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorDialogProvider } from '../a9uitemplate/dialog-error/error-dialog-provider';

export type HttpErrorHandlerAction = (statusCode: number, dialog: ErrorDialogProvider, router: Router) => boolean;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandler {
  private errorDialog = inject(ErrorDialogProvider);
  private readonly router = inject(Router);

  public standardErrorHandler(error: unknown, action?: HttpErrorHandlerAction) {
    if (error !== undefined) {
      const pd = error as HttpErrorResponse;
      if (pd) {
        if (action) {
          const isHandled = action(pd.status ?? 0, this.errorDialog, this.router);
          if (isHandled === true) {
            return;
          }
        }

        switch (pd.status) {
          case HttpStatusCode.Unauthorized:
            console.error('Unauthorized');
            this.errorDialog.show({ title: 'Unauthorized', body: 'Please login to continue' });
            this.router.navigate(['/login']);
            break;

          // case HttpStatusCode.NotFound:
          //   this.router.navigate(['/onboarding']);
          //   return;

          default:
            console.error('Statuscode: %d, %o', pd?.status, pd);
            this.errorDialog.show({ body: 'Connection to server failed. Retry later.' });
        }
      } else {
        console.error(error);
        this.errorDialog.show({ body: 'Connection to server failed. Retry later.' });
      }
    }
    else {
      // console.error('Http handler received undefined error');
      if (action) {
        const isHandled = action(0, this.errorDialog, this.router);
        if (isHandled === true) {
          return;
        }
      }
    }
  }
}
