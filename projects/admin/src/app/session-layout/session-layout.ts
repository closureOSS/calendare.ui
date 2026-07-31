import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { LanguageSwitcherButton } from '../a9uitemplate/language-switcher-button/language-switcher-button';
import { ThemeSwitcherButton } from '../a9uitemplate/theme-switcher-button/theme-switcher-button';

@Component({
  selector: 'a9-session-layout',
  imports: [
    RouterOutlet,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmItemImports,
    ThemeSwitcherButton,
    LanguageSwitcherButton,
    TranslocoDirective,
  ],
  encapsulation: ViewEncapsulation.None,
  // host: {
  //   class: 'flex h-screen w-screen flex-col ',
  // },
  templateUrl: './session-layout.html',
})
export class SessionLayout { }
