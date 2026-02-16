import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PrivilegeItemResponse } from '../../../api';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'cal-list-grant-details',
  imports: [
    MatExpansionModule,
    TranslocoDirective,
  ],
  templateUrl: './list-grant-details.html',
  styleUrl: './list-grant-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListGrantDetails {
  grants = input.required<PrivilegeItemResponse[] | undefined>();
}
