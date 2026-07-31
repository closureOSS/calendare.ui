import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { hlmH1, hlmH2, hlmH3, hlmH4, hlmP, hlmMuted } from '@spartan-ng/helm/typography';

@Component({
  selector: 'cal-page-goodbye',
  imports: [
    RouterLink,
    HlmButtonGroupImports,
    HlmButtonImports,
    TranslocoDirective,
  ],
  templateUrl: './page-goodbye.html',
})
export class PageGoodbye {
   hlmH1 = hlmH1;
    hlmH2 = hlmH2;
    hlmH3 = hlmH3;
    hlmH4 = hlmH4;
    hlmP = hlmP;
    hlmCite = hlmMuted;
}
