import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LanguageSwitcher } from '../a9uitemplate/language-switcher/language-switcher';
import { ThemeSwitcher } from '../a9uitemplate/theme-switcher/theme-switcher';

@Component({
  selector: 'cal-page-onboarding-link',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    HintBox,
    LoginUsernamePassword,
    LanguageSwitcher,
    ThemeSwitcher,
    TranslocoDirective,
  ],
  templateUrl: './page-onboarding-link.html',
  styleUrl: './page-onboarding-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageOnboardingLink {
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
