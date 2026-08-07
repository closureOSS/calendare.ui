import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SiteMenuProvider } from './a9uitemplate/site-menu/site-menu-provider';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'cal-root',
  imports: [
    RouterOutlet,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.html',
})
export class App {
  protected readonly siteMenuProvider = inject(SiteMenuProvider);
  private router = inject(Router);
  private translate = inject(TranslocoService);

  constructor() {
    this.translate.selectTranslation().subscribe(c => {
      this.siteMenuProvider.load(this.router.config, this.translate);
    });
  }
}
