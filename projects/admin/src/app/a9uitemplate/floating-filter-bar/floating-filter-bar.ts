import { Component, ViewEncapsulation } from '@angular/core';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

/**
 * A9 Floating Filter Bar - sticky wrapper around hlm-button-group
 *
 * Requires @container on the enclosing element
 *
 * The content can be everything hlm-button-group allows. Use e.g. "hidden @xl:inline" to hide content responsive.
 */
@Component({
  selector: 'a9-floating-filter-bar',
  encapsulation: ViewEncapsulation.None,
  imports: [
    HlmButtonGroupImports,
  ],
  host: {
    class: 'relative',
  },
  templateUrl: './floating-filter-bar.html',
})
export class FloatingFilterBar { }
