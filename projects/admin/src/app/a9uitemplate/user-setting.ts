import { computed, effect, inject, Service, signal } from '@angular/core';
import { ThemeMode, ThemeSwitchProvider } from './theme-switcher/theme-switch-provider';
import { TranslocoService } from '@jsverse/transloco';
import { ColorPalette, ColorPaletteSwitchProvider } from './color-palette-switcher/color-palette-switch-provider';

export class UserSetting {
  public themeMode = ThemeMode.Auto;
  public colorPalette = ColorPalette.Default;
  public language = 'en';
}

@Service()
export class UserSettingProvider {
  public readonly STORAGE_KEY = 'a9ui#usersetting';

  //
  // Theme Mode
  //
  public setThemeMode(mode: ThemeMode) {
    if (this.settings().themeMode !== mode) {
      const settings = { ... this.settings(), themeMode: mode };
      this.settings.set(settings);
    }
  }
  public getThemeMode = computed(() => this.settings().themeMode);
  protected readonly themeSwitcher = inject(ThemeSwitchProvider);

  //
  // Color Palette
  //
  public setColorPalette(palette: ColorPalette) {
    if (this.settings().colorPalette !== palette) {
      const settings = { ... this.settings(), colorPalette: palette };
      this.settings.set(settings);
    }
  }
  public getColorPalette = computed(() => this.settings().colorPalette);
  protected readonly paletteSwitcher = inject(ColorPaletteSwitchProvider);


  //
  // Language
  //
  public setLanguage(language: string) {
    if (this.settings().language !== language) {
      const settings = { ... this.settings(), language: language };
      this.settings.set(settings);
    }
  }
  public getLanguage = computed(() => this.settings().language);
  protected readonly transloco = inject(TranslocoService);

  public reset() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public initialize() {
    this.read();
  }

  private settings = signal<UserSetting>(new UserSetting());
  private read() {
    const item = localStorage.getItem(this.STORAGE_KEY);
    if (item) {
      this.settings.set(JSON.parse(item) as UserSetting);
    } else {
      this.settings.set(new UserSetting());
    }
    return this.settings();
  }

  #syncStorage = effect(() => {
    const settings = this.settings();
    const data = JSON.stringify(settings);
    localStorage.setItem(this.STORAGE_KEY, data);
    this.themeSwitcher.toggleThemeMode(settings.themeMode);
    this.paletteSwitcher.selectColorPalette(settings.colorPalette);
    this.transloco.setActiveLang(settings.language);
  });
}
