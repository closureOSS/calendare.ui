import { Service, signal } from '@angular/core';
import { Routes } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

export class MenuSection {
  public label?: string;
  public menuItems: MenuConfig[] = [];
};

export class MenuConfig {
  public label!: string;
  public path!: string[];

  public icon?: string;
  public desc?: string;
  public order = 0;
  public section = false;
  public session = false;
};

@Service()
export class SiteMenuProvider {
  #menuConfig = signal<MenuConfig[]>([]);
  public menuConfig = this.#menuConfig.asReadonly();

  #menuSections = signal<MenuSection[]>([]);
  public menuSection = this.#menuSections.asReadonly();

  public load(routes: Routes, translate: TranslocoService) {
    const menuItems = this.mapRoutes(routes, ['/'], translate);
    this.#menuConfig.set(menuItems);
    this.#menuSections.set(this.mapSection(menuItems));
    // console.log(this.#menuConfig(), this.#menuSections());
  }

  private mapRoutes(routes: Routes, basePath: string[], translate: TranslocoService) {
    const menuItems: MenuConfig[] = [];
    for (const route of routes) {
      // console.log(route, basePath);
      if (route.data?.['menu']) {
        const item = { path: [...basePath, route.path], ...route.data?.['menu'] } as MenuConfig;
        if (item.label) {
          item.label = translate.translate(item.label);
        }
        if (item.desc) {
          item.desc = translate.translate(item.desc);
        }
        menuItems.push(item);
      }
      if (route.children) {
        const subroutePath = route.path && route.path !== '' ? [...basePath, route.path!] : [...basePath];
        menuItems.push(...this.mapRoutes(route.children, subroutePath, translate));
      }
    }
    return menuItems;
  }

  private mapSection(menuItems: MenuConfig[]): MenuSection[] {
    const sections: MenuSection[] = [];
    let current: MenuSection | null = null;
    for (const menu of menuItems) {
      if (!current && !menu.section) {
        current = new MenuSection();
        sections.push(current);
      }
      if (menu.section) {
        current = new MenuSection();
        current.label = menu.label;
        sections.push(current);
      }
      else if (!menu.session) {
        current?.menuItems.push(menu);
      }
    }
    return sections;
  }
}
