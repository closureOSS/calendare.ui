import { Component, inject } from '@angular/core';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { TranslocoDirective } from '@jsverse/transloco';
import { ThemeSwitcherButton } from '../theme-switcher-button/theme-switcher-button';
import { BreadcrumbService } from '../breadcrumb/breadcrumb-service';
import { SiteSearch } from "../site-search/site-search";

@Component({
  selector: 'a9-site-sticky-header',
  imports: [
    HlmSidebarImports, HlmSeparatorImports, HlmBreadcrumbImports,
    ThemeSwitcherButton,
    TranslocoDirective,
    SiteSearch,
],
  host: {
    class: 'flex w-full items-center justify-between z-50',
  },
  templateUrl: './site-sticky-header.html',
})
export class SiteStickyHeader {
  protected breadcrumbs = inject(BreadcrumbService).breadcrumbs;
}
