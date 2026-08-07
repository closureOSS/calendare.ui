import { Component, inject } from '@angular/core';
import { TranslocoService, LangDefinition } from '@jsverse/transloco';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { SiteInternationalizationProvider } from './site-internationalization-provider';

@Component({
  selector: 'a9-language-menu',
  imports: [
    HlmDropdownMenuImports,
  ],
  templateUrl: './language-menu.html',
})
export class LanguageMenu {
  private readonly config = inject(SiteInternationalizationProvider);
  protected readonly transloco = inject(TranslocoService);
  protected availableLanguages = this.transloco.getAvailableLangs().map(v => v as LangDefinition);
  protected configLanguage = this.config.language;

  setLanguage(language: string) {
    this.config.setLanguage(language);
  }
}
