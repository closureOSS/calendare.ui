import { Directive, inject } from '@angular/core';
import { LocationStrategy } from "@angular/common";

@Directive({
  selector: '[navigate-back]',
  host: {
    '(click)': 'this.location.back()'
  },
})
export class NavigateBackDirective {
   private readonly location = inject(LocationStrategy);
}
