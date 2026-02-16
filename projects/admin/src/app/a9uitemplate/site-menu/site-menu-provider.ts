import { DOCUMENT, effect, inject, Injectable, Renderer2, signal } from '@angular/core';
import { Routes } from '@angular/router';

export class MenuConfig {
  public label!: string;
  public path!: string[];

  public icon?: string;
  public desc?: string;
  public order = 0;
  public section = false;
};

@Injectable()
export class SiteMenuProvider {
  static Class_PopupMenuOpen = 'modal-dialog-open';

  #isMenuOpen = signal<boolean>(false);
  public isOpen = this.#isMenuOpen.asReadonly();

  #menuConfig = signal<MenuConfig[]>([]);
  public menuConfig = this.#menuConfig.asReadonly();

  #document = inject(DOCUMENT);
  #renderer = inject(Renderer2);

  public close() {
    this.#isMenuOpen.set(false);
  }

  public open() {
    this.#isMenuOpen.set(true);
  }

  public toggle() {
    this.#isMenuOpen.set(!this.#isMenuOpen());
  }

  public load(routes: Routes) {
    const menuItems = this.mapRoutes(routes, ['/']);
    this.#menuConfig.set(menuItems);
  }

  private mapRoutes(routes: Routes, basePath: string[]) {
    const menuItems: MenuConfig[] = [];
    for (const route of routes) {
      if (!route.data?.['menu']) continue;
      const item = { path: [...basePath, route.path], ...route.data?.['menu'] } as MenuConfig;
      // console.log(item);
      menuItems.push(item);
      if (route.children) {
        menuItems.push(...this.mapRoutes(route.children, [...basePath, route.path!]));
      }
    }
    return menuItems;
  }

  constructor() {
    effect(() => {
      const target = this.#document.getElementsByTagName('html')[0];
      if (this.#isMenuOpen() === true) {
        this.#renderer.addClass(target, SiteMenuProvider.Class_PopupMenuOpen);
      } else {
        this.#renderer.removeClass(target, SiteMenuProvider.Class_PopupMenuOpen);
      }
    });
  }
}
