import { Directive } from '@angular/core';
import { BrnNavigationMenuLink } from '@spartan-ng/brain/navigation-menu';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: 'a[hlmTabNavigationMenuLink]',
  exportAs: 'hlmTabNavigationMenuLink',
  hostDirectives: [{ directive: BrnNavigationMenuLink, inputs: ['active'] }],
  host: {
    'data-slot': 'navigation-menu-link',
  },
})
export class HlmTabNavigationMenuLink {
  constructor() {
    classes(
      () =>
        "data-[active=true]:focus:bg-gray-400 data-[active=true]:hover:bg-gray-400 data-[active=true]:bg-gray-200 data-[active=true]:border-b-3  data-[active=true]:border-gray-500 focus-visible:ring-ring/50 hover:bg-gray-200 focus:bg-gray-200 flex items-center gap-1.5 rounded-sm p-2 px-4 -mb-3 text-sm transition-all outline-none focus-visible:ring-3 focus-visible:outline-1 [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(4)]",
    );
  }
}
