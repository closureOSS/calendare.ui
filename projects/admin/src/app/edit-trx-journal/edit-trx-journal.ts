import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'cal-edit-trx-journal',
  imports: [
    MatCardModule,
    MatButtonModule,
    TranslocoDirective,
  ],
  templateUrl: './edit-trx-journal.html',
  styleUrl: './edit-trx-journal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTrxJournal {
  private readonly client = inject(CalendareService);

  public async deleteJournal() {
    try {
      await firstValueFrom(this.client.deleteTrxJournal());
    }
    catch (e) {
      const pd = e as HttpErrorResponse;
      if (pd) {
        console.error('Error %d: %o', pd.status, pd);
        // this.formMessage.set(pd.detail ?? 'Saving changes failed');
      } else {
        console.error('Unknown error while deleting transaction journal: %o', e);
        // this.formMessage.set('Saving changes failed (reason unknown)');
      }
    }
  }
}
