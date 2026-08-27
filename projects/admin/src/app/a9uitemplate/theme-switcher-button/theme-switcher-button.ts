import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDarkModeFillOutline, matLightModeFillOutline, matRoutineFillOutline } from '@ng-icons/material-symbols/outline';
import { ThemeMode, SiteThemeProvider } from '../site-theme/site-theme-provider';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'a9-theme-switcher-button',
  imports: [
    NgIcon,
    HlmButtonImports,
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
  private readonly config = inject(SiteThemeProvider);
  value = this.config.themeMode;

  public tooltip = computed(() => {
    switch (this.value()) {
      case ThemeMode.Dark: return this.transloco.translate('Dark mode');
      case ThemeMode.Light: return this.transloco.translate('Light mode');
      case ThemeMode.Auto: return this.transloco.translate('System mode');
    }
  });

  public svgIconName = computed(() => {
    switch (this.value()) {
      case ThemeMode.Dark: return `matDarkModeFillOutline`;
      case ThemeMode.Light: return `matLightModeFillOutline`;
      case ThemeMode.Auto: return `matRoutineFillOutline`;
    }
  });

  nextTheme() {
    let theme = ThemeMode.Auto;
    switch (this.value()) {
      case ThemeMode.Dark: theme = ThemeMode.Auto; break;
      case ThemeMode.Light: theme = ThemeMode.Dark; break;
      case ThemeMode.Auto: theme = ThemeMode.Light; break;
    }
    this.config.setThemeMode(theme);
  }
}
