import { LocationStrategy } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'a9-navigate-back-button',
  imports: [
    MatButtonModule,
    MatIconModule,
    TranslocoDirective,
  ],
  host: {
    'class': 'a9-navigate-back'
  },
  templateUrl: './navigate-back-button.html',
  styleUrl: './navigate-back-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigateBackButton {
  private readonly location = inject(LocationStrategy);

  back() {
    this.location.back();
  }
}
