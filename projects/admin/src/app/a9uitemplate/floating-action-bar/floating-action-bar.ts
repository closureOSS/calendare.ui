import { Component } from '@angular/core';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

@Component({
  selector: 'a9-floating-action-bar',
  imports: [
    HlmButtonGroupImports,
  ],
  host: {
    'class': 'sticky bottom-4 right-4 z-10 w-max ml-auto my-4 flex flex-row items-center justify-end gap-4'
  },
  templateUrl: './floating-action-bar.html',
})
export class FloatingActionBar {

}
