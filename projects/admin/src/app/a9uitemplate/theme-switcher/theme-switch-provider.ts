import { afterRenderEffect, DOCUMENT, inject, RendererFactory2, Service, signal } from '@angular/core';

export enum ThemeMode { Auto = 'Auto', Dark = 'Dark', Light = 'Light', };

@Service()
export class ThemeSwitchProvider {
  #document = inject(DOCUMENT);
  #rendererFactory = inject(RendererFactory2);
  #renderer = this.#rendererFactory.createRenderer(null, null);

  #themeMode = signal<ThemeMode>(ThemeMode.Auto);
  public themeMode = this.#themeMode.asReadonly();

  constructor() {
    afterRenderEffect({
      write: () => {
        let mode = this.#themeMode();
        if (mode === ThemeMode.Auto) {
          mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeMode.Dark : ThemeMode.Light;
        }
        if (mode === ThemeMode.Dark) {
          this.#renderer.addClass(this.#document.documentElement, 'dark');
        } else {
          this.#renderer.removeClass(this.#document.documentElement, 'dark');
        }
      }
    });
  }

  public toggleThemeMode(mode: ThemeMode) {
    this.#themeMode.set(mode);
  }
}
