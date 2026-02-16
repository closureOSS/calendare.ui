import { inject } from "@angular/core";
import { Router, CanActivateFn, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, RedirectCommand } from "@angular/router";
import { CurrentUserInfoJwt } from "./current-user-info";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { take, map } from "rxjs";

// const isAuthMatch = async (_route: Route, _segments: UrlSegment[]): Promise<GuardResult> => {
//   const oidcSecurityService = inject(OidcSecurityService);
//   return false;
//   if (oidcSecurityService.isAuthenticated()) {
//     // console.log('Authenticated by OIDC');
//     return true;
//   }
//   const currentUser = inject(CurrentUserInfoJwt);
//   if (currentUser.isAuthenticated() === true) {
//     // console.log('Authenticated by calendare (local)');
//     return true;
//   }
//   return false;
// }

// export const canMatchAuthenticated: CanMatchFn = isAuthMatch;


export const isPreAuthenticated: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);
  const router = inject(Router);
  // console.log('isPreAuthenticated//');

  return oidcSecurityService.isAuthenticated$.pipe(
    take(1),
    map(({ isAuthenticated }) => {
      // allow navigation if authenticated
      if (isAuthenticated) {
        return true;
      }
      const url = router.currentNavigation()?.extractedUrl.toString().substring(1) ?? '';
      localStorage.setItem('calendare_redirect_uri', url);
      // console.log('isPreAuthenticated// store redirect=%s and go to /login first', url);
      // return router.createUrlTree(['/login']);
      const loginUrl = router.parseUrl('/login');
      return new RedirectCommand(loginUrl, { skipLocationChange: true })
    })
  );
};

export const isAuthenticated: CanActivateFn = () => {
  const router = inject(Router);
  const currentUser = inject(CurrentUserInfoJwt);
  // console.log('isAuthenticated// currentUser: %s %o', currentUser.isLinked(), currentUser);
  if (currentUser.isLinked()) {
    return true;
  }
  const url = router.currentNavigation()?.extractedUrl.toString().substring(1) ?? '';
  localStorage.setItem('calendare_redirect_uri', url);
  // return router.createUrlTree(['/login']);
  const loginUrl = router.parseUrl('/login');
  return new RedirectCommand(loginUrl, { skipLocationChange: true })
};

export const isAuthenticatedChild: CanActivateChildFn = (_childRoute: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const router = inject(Router);
  const currentUser = inject(CurrentUserInfoJwt);
  // console.log('isAuthenticatedChild// currentUser: linked=%s, auth=%s with method=%s', currentUser.isLinked(), currentUser.isAuthenticated(), authMethod);
  if (currentUser.isLinked()) {
    return true;
  }
  const oidcSecurityService = inject(OidcSecurityService);
  return oidcSecurityService.isAuthenticated$.pipe(
    take(1),
    map(({ isAuthenticated }) => {
      // allow navigation if authenticated
      if (isAuthenticated) {
        return true;
      }
      const url = router.currentNavigation()?.extractedUrl.toString().substring(1) ?? '';
      localStorage.setItem('calendare_redirect_uri', url);
      // console.log('isAuthenticatedChild// store redirect=%s and go to /login first', url);
      // return router.createUrlTree(['/login']);
      const loginUrl = router.parseUrl('/login');
      return new RedirectCommand(loginUrl, { skipLocationChange: true })
    })
  );
};

export const isLinkedAccount: CanActivateFn = () => {
  const currentUser = inject(CurrentUserInfoJwt);
  return currentUser.isLinked();
};

export const isUnlinkedAccount: CanActivateFn = () => {
  const currentUser = inject(CurrentUserInfoJwt);
  return !currentUser.isLinked();
};
