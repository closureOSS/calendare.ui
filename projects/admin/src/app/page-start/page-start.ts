import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective } from '@jsverse/transloco';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { MatButtonModule } from '@angular/material/button';
import { LanguageSwitcher } from '../a9uitemplate/language-switcher/language-switcher';
import { ThemeSwitcher } from '../a9uitemplate/theme-switcher/theme-switcher';

@Component({
  selector: 'cal-page-start',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HintBox,
    ActionBar,
    LanguageSwitcher,
    ThemeSwitcher,
    MatProgressSpinnerModule,
    TranslocoDirective,
  ],
  templateUrl: './page-start.html',
  styleUrl: './page-start.scss',
})
export class PageStart {
  constructor() {
    console.log('OIDC flow callback ...');
  }
}
