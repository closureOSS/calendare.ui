import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { BASE_PATH_CALENDAREAPI } from "../../api/tokens";

export function unauthorizedInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const basePath: string = inject(BASE_PATH_CALENDAREAPI);
  if (!req.url.startsWith(`${basePath}/`)) {
    return next(req);
  }
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
      }
      // return throwError(() => new Error(error.message));
      return throwError(() => error);
    }),
  );
}
