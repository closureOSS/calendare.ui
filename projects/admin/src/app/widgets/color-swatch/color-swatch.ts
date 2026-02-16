import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'cal-color-swatch',
  imports: [],
  host: {
    '[class.slim]': 'slim()',
    '[style.--col-color]': 'color() ?? "transparent"'
  },
  templateUrl: './color-swatch.html',
  styleUrl: './color-swatch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSwatch {
  color = input.required<string | null>();
  slim = input(false, { transform: booleanAttribute });
}
