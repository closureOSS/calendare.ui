import { Component, input } from '@angular/core';

@Component({
  selector: 'cal-color-swatch',
  imports: [],
  host: {
    '[style.--col-color]': 'color() ?? "transparent"'
  },
  templateUrl: './color-swatch.html',
  styles: `
    .color-swatch {
      background-color: var(--col-color, black);
    }
  `,
})
export class ColorSwatch {
  color = input.required<string | null>();
}
