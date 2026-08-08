import { afterRenderEffect, computed, DOCUMENT, inject, RendererFactory2, Service } from '@angular/core';
import { localStorageSignal } from '../local-storage-signal';

export enum ThemeMode { Auto = 'Auto', Dark = 'Dark', Light = 'Light', };
export enum ColorPalette { Blue = 'Blue', Green = 'Green', Default = 'Default' };

export class SiteThemeConfig {
  theme = ThemeMode.Auto;
  palette = ColorPalette.Default;
}


@Service()
export class SiteThemeProvider {
  private readonly config = localStorageSignal<SiteThemeConfig>('site_theme', new SiteThemeConfig());

  public themeMode = computed(() => {
    const config = this.config();
    return config.theme;
  });

  public palette = computed(() => {
    const config = this.config();
    return config.palette;
  });

  public setThemeMode(theme: ThemeMode) {
    this.config.update(c => { return { ...c, theme: theme } });
  }

  public setColorPalette(palette: ColorPalette) {
    this.config.update(c => { return { ...c, palette: palette } });
  }

  private currentPalette = ColorPalette.Default;
  #document = inject(DOCUMENT);
  #rendererFactory = inject(RendererFactory2);
  #renderer = this.#rendererFactory.createRenderer(null, null);
  constructor() {
    afterRenderEffect({
      write: () => {
        this.renderTheme();
        this.renderPalette();
      }
    });
  }

  private renderTheme() {
    let theme = this.themeMode();
    if (theme === ThemeMode.Auto) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeMode.Dark : ThemeMode.Light;
    }
    if (theme === ThemeMode.Dark) {
      this.#renderer.addClass(this.#document.documentElement, 'dark');
    } else {
      this.#renderer.removeClass(this.#document.documentElement, 'dark');
    }
  }

  private renderPalette() {
    const mode = this.palette();
    if (this.currentPalette !== ColorPalette.Default) {
      this.#renderer.removeClass(this.#document.documentElement, ColorPalette[this.currentPalette].toLowerCase());
    }
    if (mode && mode !== ColorPalette.Default) {
      this.#renderer.addClass(this.#document.documentElement, ColorPalette[mode].toLowerCase());
      this.currentPalette = mode;
    } else {
      this.currentPalette = ColorPalette.Default;
    }
  }
}
