import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { lucideLoaderPinwheel } from '@ng-icons/lucide';
import { hlmH1, hlmH2, hlmH3, hlmH4, hlmMuted, hlmP } from '@spartan-ng/helm/typography';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'cal-page-start',
  imports: [
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmSpinnerImports,
    TranslocoDirective,
  ],
  viewProviders: [
    provideIcons({
      lucideLoaderPinwheel,
    }),
  ],
  templateUrl: './page-start.html',
})
export class PageStart {
  hlmH1 = hlmH1;
  hlmH2 = hlmH2;
  hlmH3 = hlmH3;
  hlmH4 = hlmH4;
  hlmP = hlmP;
  hlmCite = hlmMuted;
}
