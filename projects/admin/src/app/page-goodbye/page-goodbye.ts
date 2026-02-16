import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { ThemeSwitcher } from '../a9uitemplate/theme-switcher/theme-switcher';
import { LanguageSwitcher } from '../a9uitemplate/language-switcher/language-switcher';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';

@Component({
  selector: 'cal-page-goodbye',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HintBox,
    ActionBar,
    ThemeSwitcher,
    LanguageSwitcher,
    TranslocoDirective,
  ],
  templateUrl: './page-goodbye.html',
  styleUrl: './page-goodbye.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageGoodbye {

}
