import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoService, LangDefinition } from '@jsverse/transloco';
import { UserSettingProvider } from '../user-setting';

@Component({
  selector: 'a9-language-menu',
  imports: [
    MatMenuModule,
  ],
  templateUrl: './language-menu.html',
  styleUrl: './language-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageMenu {
  private readonly settings = inject(UserSettingProvider);
  protected readonly transloco = inject(TranslocoService);

  setLanguage(language: string | LangDefinition) {
    this.settings.setLanguage(language as string);
  }
}
