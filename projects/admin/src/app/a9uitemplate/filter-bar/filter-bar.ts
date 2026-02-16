import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'a9-filter-bar',
  imports: [],
  host: {
    'class': 'a9-filter-bar'
  },
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBar {

}
