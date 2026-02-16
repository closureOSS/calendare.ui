import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageSwitcher } from '../a9uitemplate/language-switcher/language-switcher';
import { ThemeSwitcher } from '../a9uitemplate/theme-switcher/theme-switcher';
import { HintBox } from "../a9uitemplate/hint-box/hint-box";
import { ActionBar } from "../a9uitemplate/action-bar/action-bar";

@Component({
  selector: 'cal-page-login',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    LanguageSwitcher,
    ThemeSwitcher,
    ActionBar,
    HintBox,
    TranslocoDirective,
],
  templateUrl: './page-login.html',
  styleUrl: './page-login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLogin {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  public loginOidc() {
    this.oidcSecurityService.authorize();
  }
}
