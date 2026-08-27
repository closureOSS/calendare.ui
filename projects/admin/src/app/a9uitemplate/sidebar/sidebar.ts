import { Component, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';
import { SiteMenuProvider } from '../site-menu/site-menu-provider';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CurrentUserInfo } from '../current-user-info';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { matAccountBoxOutline, matAccountCircleOutline, matLanguageOutline, matLogoutOutline } from '@ng-icons/material-symbols/outline';
import { LanguageMenu } from '../language-menu/language-menu';
import { lucideEllipsisVertical } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'a9-sidebar',
  imports: [
    HlmSidebarImports,
    HlmAvatarImports,
    HlmDropdownMenuImports,
    HlmButtonImports,
    NgIcon,
    RouterLink,
    RouterLinkActive,
    TranslocoDirective,
    LanguageMenu,
  ],
  templateUrl: './sidebar.html',
  viewProviders: [
    provideIcons({
      lucideEllipsisVertical,
      matLogoutOutline,
      matAccountBoxOutline,
      matLanguageOutline,
      matAccountCircleOutline,
    }),
  ],
})
export class Sidebar {
  protected readonly menu = inject(SiteMenuProvider);

  public currentUser = inject(CurrentUserInfo);
  private readonly router = inject(Router);

  public async logout() {
    this.hideMobile();
    await this.currentUser.logout();
    await this.router.navigate(['/goodbye']);
  }

  private sidebarService = inject(HlmSidebarService);
  hideMobile() {
    if (this.sidebarService.isMobile()) {
      this.sidebarService.setOpenMobile(false);
    }
  }
}
