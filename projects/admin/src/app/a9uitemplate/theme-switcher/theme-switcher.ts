import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeMode, ThemeSwitchProvider } from './theme-switch-provider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'a9-theme-switcher',
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitcher {
  ThemeMode = ThemeMode;
  public themeSwitcher = inject(ThemeSwitchProvider);
  protected readonly transloco = inject(TranslocoService);

  protected nextThemeMode = computed(() => {
    switch (this.themeSwitcher.themeMode()) {
      case ThemeMode.Dark: return ThemeMode.Auto;
      case ThemeMode.Light: return ThemeMode.Dark;
      case ThemeMode.Auto: return ThemeMode.Light;
    }
  });

  public svgIconName(mode: ThemeMode, suffix = ''): string {
    if (suffix && suffix.length > 0) {
      suffix = `#${suffix}`;
    }
    switch (mode) {
      case ThemeMode.Dark: return `dark_mode${suffix}`;
      case ThemeMode.Light: return `light_mode${suffix}`;
      case ThemeMode.Auto: return `routine${suffix}`;
    }
  }

  public tooltip(mode: ThemeMode): string {
    switch (mode) {
      case ThemeMode.Dark: return this.transloco.translate('Dark mode');
      case ThemeMode.Light: return this.transloco.translate('Light mode');
      case ThemeMode.Auto: return this.transloco.translate('System mode');
    }
  }
}
