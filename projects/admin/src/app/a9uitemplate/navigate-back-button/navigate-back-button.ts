import { LocationStrategy } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matKeyboardDoubleArrowLeftOutline } from '@ng-icons/material-symbols/outline';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'a9-navigate-back-button',
  imports: [
    HlmButtonImports,
    NgIcon,
    TranslocoDirective,
  ],
  host: {
    'class': 'block -mt-4 py-2'
  },
  providers: [
    provideIcons({
      matKeyboardDoubleArrowLeftOutline,
    })
  ],
  templateUrl: './navigate-back-button.html',
})
export class NavigateBackButton {
  private readonly location = inject(LocationStrategy);

  back() {
    this.location.back();
  }
}
