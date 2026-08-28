import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matLanguageOutline } from '@ng-icons/material-symbols/outline';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { LanguageMenu } from '../language-menu/language-menu';
import { TranslocoDirective } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'a9-language-switcher-button',
  imports: [
    NgIcon,
    HlmDropdownMenuImports,
    HlmButtonImports,
    LanguageMenu,
    TranslocoDirective,
  ],
   providers: [
    provideIcons({
      matLanguageOutline,
    }),
  ],
  templateUrl: './language-switcher-button.html',
})
export class LanguageSwitcherButton {}
