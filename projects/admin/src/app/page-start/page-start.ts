import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective } from '@jsverse/transloco';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'cal-page-start',
  imports: [
    MatCardModule,
    MatIconModule,
    HintBox,
    MatProgressSpinnerModule,
    TranslocoDirective,
  ],
  templateUrl: './page-start.html',
  styleUrl: './page-start.scss',
})
export class PageStart {
  constructor() {
    console.log('OIDC flow callback ...');
  }
}
