import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginUsernamePassword } from '../widgets/login-username-password/login-username-password';
import { LoginCredentialsFormData } from '../widgets/login-username-password/login-credentials-form-data';
import { HttpStatusCode } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CalendareService } from '../../api';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { CurrentUserInfoJwt } from '../core/current-user-info';
import { CurrentUserRepository } from '../core/current-user-repository';
import { ErrorDialogProvider } from '../a9uitemplate/dialog-error/error-dialog-provider';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { hlmH1, hlmH2, hlmH3, hlmH4, hlmP, hlmMuted } from '@spartan-ng/helm/typography';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'cal-page-onboarding-link',
  imports: [
    RouterLink,
    HintBox,
    LoginUsernamePassword,
    HlmButtonImports,
    HlmCardImports,
    TranslocoDirective,
  ],
  host: {
    class: 'w-full flex items-center flex-col'
  },
  templateUrl: './page-onboarding-link.html',
})
export class PageOnboardingLink {
  hlmH1 = hlmH1;
  hlmH2 = hlmH2;
  hlmH3 = hlmH3;
  hlmH4 = hlmH4;
  hlmP = hlmP;
  hlmCite = hlmMuted;
  private errorDialog = inject(ErrorDialogProvider);
  public readonly currentUser = inject(CurrentUserInfoJwt);
  public readonly currentUserRepository = inject(CurrentUserRepository);
  private readonly router = inject(Router);

  public allowAutoProvisioning = signal<boolean>(false);
  private readonly client = inject(CalendareService);

  public errorLoginMsg = signal<string | null>(null);
  private transloco = inject(TranslocoService);

  constructor() {
    this.currentUserRepository.linkAccount().then(statusCode => {
      switch (statusCode) {
        case HttpStatusCode.Ok:
        case HttpStatusCode.Created:
          // Autolinking was successfull, redirect
          this.router.navigate(['/start']);
          break;

        case HttpStatusCode.NotFound:
          // TODO: Autolinking failed, ask for provisioning new user
          this.allowAutoProvisioning.set(true);
          break;

        case HttpStatusCode.Unauthorized:
        default:
          this.errorDialog.show({ body: this.transloco.translate('Connection to server failed. Retry later.') });
          break;
      }
    });
  }


  public async linkCurrentUser(credentials: LoginCredentialsFormData) {
    // console.log('loginLocal with ', credentials.username);
    // const x = await this.currentUserRepository.getPrincipal();

    if (!(credentials.username && credentials.password)) {
      return this.currentUser.set(undefined);
    }
    try {
      await firstValueFrom(this.client.linkCurrentUser(this.currentUser.subject() ?? "", { username: credentials.username, password: credentials.password }));
      console.log('linkAccount with ', credentials.username);
      const principal = await firstValueFrom(this.client.getPrincipalOfMyself());
      this.currentUser.link(principal);
      this.router.navigate(['/start']);
    }
    catch (e) {
      console.error(e);
      this.errorLoginMsg.set(this.transloco.translate('Login failed'));
    }
  }

  public async abort() {
    await this.currentUser.logout();
    await this.router.navigate(['/goodbye']);
  }
}
