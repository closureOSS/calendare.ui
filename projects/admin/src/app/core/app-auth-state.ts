import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OidcSecurityService, PublicEventsService, EventTypes, LoginResponse } from 'angular-auth-oidc-client';
import { catchError, filter, map, share, switchMap, tap } from 'rxjs';
import { CalendareService } from '../../api/services';
import { CurrentUserInfoJwt } from './current-user-info';
import { PrincipalResponse } from '../../api/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppAuthState {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly eventService = inject(PublicEventsService);
  public readonly currentUser = inject(CurrentUserInfoJwt);
  private readonly client = inject(CalendareService);
  private readonly router = inject(Router);

  private oidcEvents = this.eventService.registerForEvents().pipe(
    share(),
    tap(ev => console.log('OIDC Event %s -> %o', EventTypes[ev.type], ev.value)),
    takeUntilDestroyed()
  );

  private userDataChanged$ = this.oidcEvents.pipe(
    filter(e => e.type === EventTypes.UserDataChanged),
    map(e => e.value),
  )

  public oidcAuthCheck = this.oidcSecurityService
    .checkAuth()
    .pipe(
      // tap((loginResponse: LoginResponse) => console.log('1 %o', loginResponse)),
      filter((loginResponse: LoginResponse) => loginResponse.isAuthenticated),
      // tap((loginResponse: LoginResponse) => console.log('2 %o', loginResponse)),
      tap((loginResponse: LoginResponse) => {
        if (loginResponse.isAuthenticated === true) {
          this.currentUser.set(loginResponse.userData);
        }
      }),
      switchMap(() => this.client.getPrincipalOfMyself()),
      tap((principal: PrincipalResponse) => {
        this.currentUser.link(principal);
      }),
      switchMap(() => this.redirectOnSuccess()),
      catchError((err, ex) => {
        console.error(err);
        if (err as HttpErrorResponse) {
          if (err.status === HttpStatusCode.Forbidden) {
            console.warn('No calendare user found for authorized user');
            return this.router.navigate(['/onboarding', 'link']);
          }
        }
        return ex;
      }),
      takeUntilDestroyed()
    );

  public start() {
    this.oidcEvents.subscribe();
    this.oidcAuthCheck.subscribe();
    this.userDataChanged$.subscribe(userdata => console.log('Userdate changed to %o', userdata));
  }

  private redirectOnSuccess() {
    const restoredUrl = localStorage.getItem('calendare_redirect_uri');
    // console.log('Redirecting to %s (localStorage=%o)', restoredUrl ?? '/start', restoredUrl);
    if (restoredUrl) {
      localStorage.removeItem('calendare_redirect_uri');
      return this.router.navigateByUrl(restoredUrl);
    }
    return this.router.navigate(['/start'])
  }

  public async logout() {
    await this.currentUser.logout();
    await this.router.navigate(['/goodbye']);
  }
}
