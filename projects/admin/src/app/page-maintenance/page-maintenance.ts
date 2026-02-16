import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditTrxJournal } from '../edit-trx-journal/edit-trx-journal';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'cal-page-maintenance',
  imports: [
    EditTrxJournal,
    TranslocoDirective,
  ],
  templateUrl: './page-maintenance.html',
  styleUrl: './page-maintenance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageMaintenance {

}
