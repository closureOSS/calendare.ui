import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'cal-page-not-found',
  imports: [
    RouterLink,
    MatButtonModule,
    TranslocoDirective,
  ],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',

})
export class PageNotFound {

}
