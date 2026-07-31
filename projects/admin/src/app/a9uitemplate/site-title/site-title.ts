import { Component } from '@angular/core';
import { hlmH2 } from '@spartan-ng/helm/typography';

@Component({
  selector: 'a9-site-title',
  imports: [],
  templateUrl: './site-title.html',
})
export class SiteTitle {
  hmlTitle = hlmH2;
}
