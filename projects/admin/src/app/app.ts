import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SiteFooter } from './a9uitemplate/site-footer/site-footer';
import { SiteMenuInline } from './a9uitemplate/site-menu/site-menu-inline';
import { SiteMenuPopup } from './a9uitemplate/site-menu/site-menu-popup';
import { SiteMenuProvider } from './a9uitemplate/site-menu/site-menu-provider';
import { SiteToolbar } from './a9uitemplate/site-toolbar/site-toolbar';
import { toSignal } from '@angular/core/rxjs-interop';
import { translateSignal, TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { filter, map } from 'rxjs';
import { version } from '../../../../package.json';
import { PageMode } from './a9uitemplate/page-mode';
import { PageResponsiveness } from './a9uitemplate/page-responsiveness';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'cal-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SiteToolbar,
    SiteMenuInline,
    SiteMenuPopup,
    SiteFooter,
    TranslocoDirective,
  ],
  providers: [
    SiteMenuProvider,
  ],
  host: {
    'class': 'a9-root',
    '[class.page-modal]': "pageMode() === PageMode.Modal",
    '[attr.app-version]': "version"
  },
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  PageMode = PageMode;
  protected readonly title = translateSignal('#ShortAppname');
  public version: string = version;
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly screenSize = inject(PageResponsiveness);
  protected readonly siteMenuProvider = inject(SiteMenuProvider);
  protected readonly transloco = inject(TranslocoService);
  private router = inject(Router);
  public pageMode = computed(() => {
    const data = this.routeData();
    if (data) {
      if (data['pageMode']) {
        return data['pageMode'] as PageMode;
      }
    }
    return PageMode.Modal;
  });

  protected routeData = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      // tap(re => console.warn('%o', this.activatedRoute.snapshot.firstChild?.data)),
      map(() => this.activatedRoute.snapshot.firstChild?.data)
    ),
    { initialValue: null }
  );

  protected menuClose(_ev: Event) {
    this.siteMenuProvider.close();
  }

  // Workaround for Safari (dialog closedby="any" is not properly handled)
  protected isBackdrop(event: PointerEvent) {
    if ('closedBy' in HTMLDialogElement.prototype) {
      return false;
    }
    const target = event.target as HTMLElement;
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    const isOnBackdrop = rect.left > event.clientX ||
      rect.right < event.clientX ||
      rect.top > event.clientY ||
      rect.bottom < event.clientY
      ;
    // console.log(event.target.className, event.target.id, rect, isOnBackdrop);
    return isOnBackdrop;
  }

  constructor() {
    this.siteMenuProvider.load(this.router.config);
  }
}
