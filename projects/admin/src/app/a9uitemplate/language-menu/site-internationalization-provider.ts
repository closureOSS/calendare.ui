import { computed, effect, inject, Service } from "@angular/core";
import { localStorageSignal } from "../local-storage-signal";
import { getBrowserLang, LangDefinition, TranslocoService } from "@jsverse/transloco";

export class SiteInternationalizationConfig {
  public language = '*';
}

@Service()
export class SiteInternationalizationProvider {
  protected readonly transloco = inject(TranslocoService);
  private readonly config = localStorageSignal<SiteInternationalizationConfig>('site_i18n', new SiteInternationalizationConfig());

  public language = computed(() => {
    const config = this.config();
    return config.language;
  });

  public setLanguage(language: string) {
    this.config.update(c => { return { ...c, language: language } });
  }

  #syncStorage = effect(() => {
    const settings = this.config();
    let language = settings.language;
    if (settings.language === '*') {
      language = this.detectBrowserLanguage();
    }
    this.transloco.setActiveLang(language);
  });

  private detectBrowserLanguage(): string {
    const browserLanguage = getBrowserLang();
    const supportedLanguage = this.transloco.getAvailableLangs().find(l => (l as LangDefinition).id === browserLanguage);
    // console.log('Browser language %s -> %o', browserLanguage, supportedLanguage);
    return supportedLanguage ? (supportedLanguage as LangDefinition).id : 'en';
  }
}
