import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TranslocoDirective } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { hlmH1, hlmH2, hlmH3, hlmH4, hlmMuted, hlmP } from '@spartan-ng/helm/typography';


@Component({
  selector: 'cal-page-login',
  imports: [
    HlmButtonGroupImports,
    HlmButtonImports,
    TranslocoDirective,
  ],
  templateUrl: './page-login.html',
})
export class PageLogin {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  public loginOidc() {
    this.oidcSecurityService.authorize();
  }

  hlmH1 = hlmH1;
  hlmH2 = hlmH2;
  hlmH3 = hlmH3;
  hlmH4 = hlmH4;
  hlmP = hlmP;
  hlmCite = hlmMuted;
}
