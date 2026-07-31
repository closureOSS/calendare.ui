import { Component, inject } from '@angular/core';
import { OperationService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoDirective } from '@jsverse/transloco';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmItemImports } from '@spartan-ng/helm/item';

@Component({
  selector: 'cal-edit-trx-journal',
  imports: [
    HlmItemImports,
    HlmButtonImports,
    TranslocoDirective,
  ],
  templateUrl: './edit-trx-journal.html',
})
export class EditTrxJournal {
  private readonly client = inject(OperationService);

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
