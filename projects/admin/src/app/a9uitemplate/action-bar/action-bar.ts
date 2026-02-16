import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'a9-action-bar',
  imports: [],
  host: {
    'class': 'a9-action-bar'
  },
  templateUrl: './action-bar.html',
  styleUrl: './action-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBar {

}
