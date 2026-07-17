import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'cal-page-not-found',
  imports: [
    RouterLink,
    MatButtonModule,
    TranslocoDirective,
  ],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',

})
export class PageNotFound {
  private router = inject(Router);
  constructor() {
    console.error('Page not found: %s', this.router.url);
  }
}
