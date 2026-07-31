import { Component, computed, inject, linkedSignal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDarkModeFillOutline, matLightModeFillOutline, matRoutineFillOutline } from '@ng-icons/material-symbols/outline';
import { ThemeMode } from '../theme-switcher/theme-switch-provider';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UserSettingProvider } from '../user-setting';

@Component({
  selector: 'a9-theme-switcher-button',
  imports: [
    NgIcon,
    TranslocoDirective,
  ],
  providers: [
    provideIcons({
      matRoutineFillOutline, matDarkModeFillOutline, matLightModeFillOutline,
    }),
  ],
  templateUrl: './theme-switcher-button.html',
})
export class ThemeSwitcherButton {
  ThemeMode = ThemeMode;
  protected readonly transloco = inject(TranslocoService);

  private readonly settings = inject(UserSettingProvider);
  protected nextThemeMode = computed(() => {
    switch (this.value()) {
      case ThemeMode.Dark: return ThemeMode.Auto;
      case ThemeMode.Light: return ThemeMode.Dark;
      case ThemeMode.Auto: return ThemeMode.Light;
    }
  });

  public tooltip(theme: ThemeMode): string {
    switch (theme) {
      case ThemeMode.Dark: return this.transloco.translate('Dark mode');
      case ThemeMode.Light: return this.transloco.translate('Light mode');
      case ThemeMode.Auto: return this.transloco.translate('System mode');
    }
  }

  public svgIconName(theme: ThemeMode): string {
    switch (theme) {
      case ThemeMode.Dark: return `matDarkModeFillOutline`;
      case ThemeMode.Light: return `matLightModeFillOutline`;
      case ThemeMode.Auto: return `matRoutineFillOutline`;
    }
  }


  value = linkedSignal({
    source: () => this.settings.getThemeMode,
    computation: (item) => item() ?? ThemeMode.Auto,
  });

  selectTheme(theme: ThemeMode | null | undefined) {
    if (theme) {
      this.settings.setThemeMode(theme);
    }
  }
}
