import { InjectionToken } from "@angular/core";
import { HttpInterceptor, HttpContextToken } from "@angular/common/http";

/**
 * Injection token for the CalendareApi client base API path
 */
export const BASE_PATH_CALENDAREAPI = new InjectionToken<string>('BASE_PATH_CALENDAREAPI', {
    providedIn: 'root',
    factory: () => '/api', // Default fallback
});
/**
 * Injection token for the CalendareApi client HTTP interceptor instances
 */
export const HTTP_INTERCEPTORS_CALENDAREAPI = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS_CALENDAREAPI', {
    providedIn: 'root',
    factory: () => [], // Default empty array
});
/**
 * HttpContext token to identify requests belonging to the CalendareApi client
 */
export const CLIENT_CONTEXT_TOKEN_CALENDAREAPI = new HttpContextToken<string>(() => 'CalendareApi');
