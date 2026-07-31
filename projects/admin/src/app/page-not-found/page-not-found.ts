import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'cal-page-not-found',
  imports: [
    RouterLink,
    HlmButtonImports,
    TranslocoDirective,
  ],
  templateUrl: './page-not-found.html',
})
export class PageNotFound {
  private router = inject(Router);
  constructor() {
    console.error('Page not found: %s', this.router.url);
  }
}
