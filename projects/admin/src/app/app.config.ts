import { ApplicationConfig, inject, isDevMode, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding, withRouterConfig, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { RuntimeConfig } from './core/runtime-config';
import { provideAuth, LogLevel, authInterceptor } from 'angular-auth-oidc-client';
import { provideCalendareApiClient } from '../api';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './a9uitemplate/transloco-loader';
import { APP_SITE_TITLE, PageTitleStrategy } from './a9uitemplate/page-title-strategy';
import { CurrentUserInfoJwt } from './core/current-user-info';
import { CurrentUserInfo } from './a9uitemplate/user-setting-menu/current-user-info';
import { marker as _ } from "@jsverse/transloco-keys-manager/marker";
import { SvgIcons } from './core/svg-icons';
import { AppAuthState } from './core/app-auth-state';
import { UserSettingProvider } from './a9uitemplate/user-setting';


export function appConfig(config: RuntimeConfig): ApplicationConfig {
  console.log('Bootstrapping with %o', config);
  return {
    providers: [
      { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd.MM.yyyy HH:mm:ss OOOO' } },
      { provide: APP_SITE_TITLE, useValue: _('#TitleAppname') },
      { provide: TitleStrategy, useClass: PageTitleStrategy },
      { provide: CurrentUserInfo, useExisting: CurrentUserInfoJwt },
      provideZonelessChangeDetection(),
      provideBrowserGlobalErrorListeners(),
      provideRouter(routes,
        withRouterConfig({ canceledNavigationResolution: 'computed' }),
        // withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
        withComponentInputBinding(),
        withViewTransitions(),
        // withDebugTracing()
      ),
      provideAuth({
        config: {
          authority: config.oidcUri,
          redirectUrl: window.location.origin + '/admin/',
          postLogoutRedirectUri: window.location.origin + '/admin/goodbye',
          clientId: config.oidcClientId,
          scope: config.oidcScopes,
          responseType: 'code',
          silentRenew: true,
          useRefreshToken: true,
          secureRoutes: [config.apiBaseUrl,],
          logLevel: LogLevel.Warn,
          // triggerAuthorizationResultEvent: true,
          // renewUserInfoAfterTokenRenew: true,
          // historyCleanupOff: true,
          // ignoreNonceAfterRefresh: true,
          ngswBypass: true,
          postLoginRoute: '/start',
          // forbiddenRoute: '/goodbye',
          // unauthorizedRoute: '/goodbye',
        },
      }),
      // provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
      provideHttpClient(withFetch(), withInterceptors([
        authInterceptor(),
        // loggingInterceptor,
        // unauthorizedInterceptor
      ])),
      provideCalendareApiClient({ basePath: config.apiBaseUrl }),
      provideTransloco({
        config: {
          availableLangs: ['en', 'de'],
          defaultLang: 'en',
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
          flatten: {
            aot: !isDevMode()
          }
        },
        loader: TranslocoHttpLoader
      }),
      provideAppInitializer(() => {
        const _svgIcons = inject(SvgIcons);
      }),
      provideAppInitializer(() => {
        const authState = inject(AppAuthState);
        authState.start();
      }),
      provideAppInitializer(() => {
        const userSettings = inject(UserSettingProvider);
        userSettings.initialize();
      }),
    ]
  };
};
