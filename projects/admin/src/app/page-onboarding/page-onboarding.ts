import { HttpStatusCode } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormPrincipalCreate } from '../form-principal-create/form-principal-create';
import { PrincipalCreateFormData } from '../form-principal-create/principal-create-form.interface';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { CurrentUserInfoJwt } from '../core/current-user-info';
import { CurrentUserRepository } from '../core/current-user-repository';
import { ErrorDialogProvider } from '../a9uitemplate/dialog-error/error-dialog-provider';
import { PrincipalResponse } from '../../api/models';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { hlmH1, hlmH2, hlmH3, hlmH4, hlmMuted, hlmP } from '@spartan-ng/helm/typography';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'cal-page-onboarding',
  imports: [
    RouterLink,
    HintBox,
    FormPrincipalCreate,
    HlmCardImports,
    HlmButtonImports,
    TranslocoDirective,
  ],
  host: {
    class: 'w-full flex items-center flex-col'
  },
  templateUrl: './page-onboarding.html',
})
export class PageOnboarding {
  hlmH1 = hlmH1;
  hlmH2 = hlmH2;
  hlmH3 = hlmH3;
  hlmH4 = hlmH4;
  hlmP = hlmP;
  hlmCite = hlmMuted;
  private errorDialog = inject(ErrorDialogProvider);
  private readonly router = inject(Router);

  public readonly currentUser = inject(CurrentUserInfoJwt);
  public readonly currentUserRepository = inject(CurrentUserRepository);

  public allowAutoProvisioning = signal<boolean>(false);
  public formMessage = signal<string | null>(null);
  public defaultData: Partial<PrincipalCreateFormData>;
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
          // Autolinking failed, ask for provisioning new user
          this.allowAutoProvisioning.set(true);
          break;

        case HttpStatusCode.Unauthorized:
        default:
          this.errorDialog.show({ body: this.transloco.translate('Connection to server failed. Retry later.') });
          break;
      }
    });
    this.defaultData = {
      email: this.currentUser.email() ?? '',
      displayName: this.currentUser.displayname() ?? '',
      username: 'user-' + this.currentUser.subject(),
    };
  }

  public async onboard(data: PrincipalCreateFormData) {
    const response = await this.currentUserRepository.createDefaultAccount({ ...data, type: "INDIVIDUAL" });
    const principal = response as PrincipalResponse;
    // console.log('AutoProvisioning(%o) --> %o (%o)', data, response, principal);
    if (principal) {
      this.currentUser.link(principal);
      await this.router.navigate(['/start']);
    } else {
      // console.log('AutoProvisioning -> %o %s', data, statusCode);
      switch (response) {
        case HttpStatusCode.BadRequest:
          this.formMessage.set(this.transloco.translate('Creating account failed, please check your input and retry.'));
          break;

        case HttpStatusCode.Conflict:
          this.formMessage.set(this.transloco.translate('Username is already in use. Please change username.'));
          // this.errorDialog.show({ body: 'Username is already in use. Please change username.' });
          break;

        case HttpStatusCode.Unauthorized:
        default:
          this.errorDialog.show({ body: this.transloco.translate('Connection to server failed. Retry later.') });
          break;
      }
    }
  }

  public async abort() {
    await this.currentUser.logout();
    await this.router.navigate(['/goodbye']);
  }
}
