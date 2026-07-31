import { Component, inject } from '@angular/core';
import { TranslocoService, LangDefinition } from '@jsverse/transloco';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { UserSettingProvider } from '../user-setting';

@Component({
  selector: 'a9-language-menu',
  imports: [
    HlmDropdownMenuImports,
  ],
  templateUrl: './language-menu.html',
})
export class LanguageMenu {
  private readonly settings = inject(UserSettingProvider);
  protected readonly transloco = inject(TranslocoService);

  setLanguage(language: string | LangDefinition) {
    this.settings.setLanguage(language as string);
  }
}
