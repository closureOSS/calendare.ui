import { inject, Injectable } from '@angular/core';
import { ThemeMode } from './theme-switcher/theme-switch-provider';
import { TranslocoService } from '@jsverse/transloco';

export class UserSetting {
  public themeMode = ThemeMode.Auto;
  public language = 'en';
}

@Injectable({
  providedIn: 'root'
})
export class UserSettingProvider {
  public readonly STORAGE_KEY = 'a9ui#usersetting';

  //
  // Theme Mode
  //
  public setThemeMode(mode: ThemeMode) {
    const settings = this.read();
    if (settings.themeMode !== mode) {
      settings.themeMode = mode;
      this.write(settings);
      this.activateThemeMode(settings);
    }
  }

  public getThemeMode(): ThemeMode {
    const settings = this.read();
    return settings.themeMode;
  }

  private activateThemeMode(settings: UserSetting) {
    // TODO: ?? invert logic ??
  }

  //
  // Language
  //
  public setLanguage(language: string) {
    const settings = this.read();
    if (settings.language !== language) {
      settings.language = language;
      this.write(settings);
      this.activateLanguage(settings);
    }
  }


  public getLanguage(): string {
    const settings = this.read();
    return settings.language;
  }

  protected readonly transloco = inject(TranslocoService);
  private activateLanguage(settings: UserSetting) {
    this.transloco.setActiveLang(settings.language);
  }



  public reset() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public initialize() {
    const settings = this.read();
    this.activateLanguage(settings);
    this.activateThemeMode(settings);
  }

  private read(): UserSetting {
    const item = localStorage.getItem(this.STORAGE_KEY);
    if (item) {
      return JSON.parse(item) as UserSetting;
    }
    return new UserSetting();
  }

  private write(us: UserSetting) {
    const data = JSON.stringify(us);
    localStorage.setItem(this.STORAGE_KEY, data);
  }
}
