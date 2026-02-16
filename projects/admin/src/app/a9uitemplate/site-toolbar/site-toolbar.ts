import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
import { UserSettingMenu } from '../user-setting-menu/user-setting-menu';
import { SiteMenuProvider } from '../site-menu/site-menu-provider';
import { PageResponsiveness } from '../page-responsiveness';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'a9-site-toolbar',
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule,
    ThemeSwitcher, UserSettingMenu,
    TranslocoDirective,
],
  host: {
    'class': 'a9-site-toolbar'
  },
  templateUrl: './site-toolbar.html',
  styleUrl: './site-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteToolbar {
  appTitle = input.required<string>();
  toggleMenu = output<boolean>();
  protected readonly siteMenuProvider = inject(SiteMenuProvider);
  protected readonly screenSize = inject(PageResponsiveness);

  public menu() {
    this.siteMenuProvider.toggle();
    this.toggleMenu.emit(this.siteMenuProvider.isOpen());
  }
}
