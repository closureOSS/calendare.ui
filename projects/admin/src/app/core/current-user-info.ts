import { computed, inject, Injectable, signal } from '@angular/core';
import { PrincipalResponse } from '../../api';
import { CurrentUserInfo } from '../a9uitemplate/user-setting-menu/current-user-info';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserInfoJwt extends CurrentUserInfo {
  private usernameSignal = signal<string | null>(null);
  private subSignal = signal<string | null>(null);
  private accountSignal = signal<PrincipalResponse | null>(null);


  public readonly username = this.usernameSignal.asReadonly();
  public readonly subject = this.subSignal.asReadonly();
  public readonly isLinked = computed(() => this.accountSignal() !== null);
  public readonly account = this.accountSignal.asReadonly();

  public set(token: any | undefined) {
    if (!token) {
      return this.clear();
    }
    // console.log('Setting info from token', token);
    this.usernameSignal.set(token['preferred_username'] ?? '');
    const emailVerified = token['email_verified'];
    this.email.set(emailVerified && emailVerified === true ? token['email'] ?? '' : null);
    this.subSignal.set(token.sub ?? '');
    this.displayname.set(token.display_name ?? token.name ?? token.sub ?? '');
    this.picture.set(token.picture ?? null);
  }

  public link(principal: PrincipalResponse) {
    this.accountSignal.set(principal);
    // console.log('Linking to account %o', principal);
  }

  protected override clear() {
    this.accountSignal.set(null);
    this.usernameSignal.set(null);
    this.subSignal.set(null);
    super.clear();
  }

  private readonly oidcSecurityService = inject(OidcSecurityService);

  public override async logout(): Promise<void> {
    try {
      localStorage.removeItem('calendare_redirect_uri');
      await firstValueFrom(this.oidcSecurityService.logoffAndRevokeTokens());
    } catch (e) {
      console.warn('Logout failed %o', e);
    }
    finally {
      this.clear();
    }
  }
}
