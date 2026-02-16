import { inject, Injectable, InjectionToken } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { MenuConfig } from '../a9uitemplate/site-menu/site-menu-provider';
import { TranslocoService } from '@jsverse/transloco';

export const APP_SITE_TITLE = new InjectionToken<string>('application title');

@Injectable({
  providedIn: 'root'
})
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);
  private readonly applicationTitle = inject(APP_SITE_TITLE);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let pageTitle = this.buildTitle(snapshot);
    if (!pageTitle) {
      const deepestRoute = this.getDeepestRouteSnapshot(snapshot);
      // console.log(deepestRoute.data);
      const menuConfig = deepestRoute?.data?.['menu'] as MenuConfig;
      if (menuConfig) {
        // console.log(deepestRoute, menuConfig);
        pageTitle = menuConfig.label;
      }
    }
    const siteName = this.transloco.translate(this.applicationTitle);
    if (pageTitle) {
      this.title.setTitle(`${this.transloco.translate(pageTitle)} - ${siteName}`);
    } else {
      this.title.setTitle(siteName);
    }
  }

  private getDeepestRouteSnapshot(snapshot: RouterStateSnapshot): ActivatedRouteSnapshot {
    let route = snapshot.root;

    while (route.firstChild) {
      const primaryChild = route.children.find(child => child.outlet === 'primary');

      if (primaryChild) {
        route = primaryChild;
      } else {
        break;
      }
    }

    return route;
  }
}
