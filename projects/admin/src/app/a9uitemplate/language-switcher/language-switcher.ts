import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageMenu } from '../language-menu/language-menu';

@Component({
  selector: 'a9-language-switcher',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    LanguageMenu,
  ],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcher {
}
