import { computed, DOCUMENT, effect, inject, Injectable, RendererFactory2, signal } from '@angular/core';
import { UserSettingProvider } from '../user-setting';

export enum ThemeMode { Auto = 'Auto', Dark = 'Dark', Light = 'Light', };

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchProvider {
  private readonly settings = inject(UserSettingProvider);
  private rendererFactory = inject(RendererFactory2);
  private document = inject<Document>(DOCUMENT);
  private renderer = computed(() => {
    return this.rendererFactory.createRenderer(null, null);
  });

  #themeMode = signal<ThemeMode>(ThemeMode.Auto);
  public themeMode = this.#themeMode.asReadonly();

  constructor() {
    effect(() => {
      let mode = this.#themeMode();
      const renderer = this.renderer();
      if (mode === ThemeMode.Auto) {
        mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeMode.Dark : ThemeMode.Light;
      }
      if (mode === ThemeMode.Dark) {
        renderer.addClass(this.document.body, `dark-theme`);
      } else {
        renderer.removeClass(this.document.body, 'dark-theme');
      }
    });

    this.#themeMode.set(this.settings.getThemeMode());
  }

  public toggleThemeMode(mode: ThemeMode) {
    this.settings.setThemeMode(mode);
    this.#themeMode.set(mode);
  }
}
