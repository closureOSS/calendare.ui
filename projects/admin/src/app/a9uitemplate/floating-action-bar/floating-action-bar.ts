import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'a9-floating-action-bar',
  imports: [],
  host: {
    'class': 'a9-floating-action-bar'
  },
  templateUrl: './floating-action-bar.html',
  styleUrl: './floating-action-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatingActionBar {

}
