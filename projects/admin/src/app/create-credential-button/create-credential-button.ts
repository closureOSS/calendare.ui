import { booleanAttribute, Component, input, output } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { matAddCardOutline, matIdCard2Outline, matIdCardFillOutline } from '@ng-icons/material-symbols/outline';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'cal-create-credential-button',
  imports: [
    NgIcon,
    HlmDropdownMenuImports,
    HlmButtonImports,
    RouterLink,
    TranslocoDirective,
  ],
  providers: [
    provideIcons({
      matAddCardOutline, matIdCard2Outline, matIdCardFillOutline,
    }),
  ],
  templateUrl: './create-credential-button.html',
})
export class CreateCredentialButton {
  public username = input.required<string>();
  public email = input<string | null | undefined>(null);
  public disabled = input(false, { transform: booleanAttribute });
}
