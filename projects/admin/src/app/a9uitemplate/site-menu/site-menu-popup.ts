import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SiteMenuProvider } from './site-menu-provider';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'a9-site-menu-popup',
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    RouterLinkActive,
    TranslocoDirective,
  ],
  host: {
    'class': 'a9-site-menu-popup'
  },
  templateUrl: './site-menu-popup.html',
  styleUrl: './site-menu-popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteMenuPopup {
  protected readonly menu = inject(SiteMenuProvider);
}
