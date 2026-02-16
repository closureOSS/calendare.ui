import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewVersion } from '../view-version/view-version';

@Component({
  selector: 'cal-page-features',
  imports: [
    ViewVersion,
  ],
  templateUrl: './page-features.html',
  styleUrl: './page-features.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageFeatures {

}
