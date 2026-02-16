import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { SiteMenuProvider } from './site-menu-provider';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'a9-site-menu',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    TranslocoDirective,
  ],
  host: {
    'class': 'a9-site-menu'
  },
  templateUrl: './site-menu.html',
  styleUrl: './site-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteMenu {
  protected readonly menu = inject(SiteMenuProvider);
  // submenus = viewChildren(MatMenu);
}
