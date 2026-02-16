import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SiteMenuProvider } from './site-menu-provider';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'a9-site-menu-inline',
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    RouterLinkActive,
    TranslocoDirective,
  ],
  host: {
    'class': 'a9-site-menu-inline'
  },
  templateUrl: './site-menu-inline.html',
  styleUrl: './site-menu-inline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteMenuInline {
  protected readonly menu = inject(SiteMenuProvider);
}
