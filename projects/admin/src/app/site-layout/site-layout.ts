import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../a9uitemplate/sidebar/sidebar';
import { SiteStickyHeader } from '../a9uitemplate/site-sticky-header/site-sticky-header';
import { translateSignal } from '@jsverse/transloco';

@Component({
  selector: 'cal-site-layout',
  imports: [
    RouterOutlet,
    Sidebar,
    SiteStickyHeader,
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: '[--header-height:--spacing(14)] flex h-screen w-screen flex-col overflow-hidden',
  },
  templateUrl: './site-layout.html',
})
export class SiteLayout {
  protected readonly title = translateSignal('#TitleAppname');
}
