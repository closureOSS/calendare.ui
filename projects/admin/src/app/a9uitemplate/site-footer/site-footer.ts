import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'a9-site-footer',
  imports: [],
  host: {
    'class': 'a9-site-footer'
  },
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteFooter {

}
