import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  imports: [
  ],
  selector: 'a9-tab-navigation-bar',
  host: {
    '[class]': "inline() ? 'relative block overflow-x-auto sticky top-0 z-2 @container' : 'relative block overflow-x-auto sticky top-0 z-2 @container pb-5 -mt-4 sm:-m-4'",
  },
  templateUrl: './tab-navigation-bar.html',
})
export class TabNavigationBar {
  inline = input<boolean>(false, { transform: booleanAttribute })
}
