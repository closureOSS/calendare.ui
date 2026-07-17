import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OperationService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'cal-edit-trx-gc',
  imports: [
    MatCardModule,
    MatButtonModule,
    TranslocoDirective,
  ],
  templateUrl: './edit-trx-gc.html',
  styleUrl: './edit-trx-gc.scss',

})
export class EditTrxGc {
  private readonly client = inject(OperationService);

  public async collectGarbage() {
    try {
      await firstValueFrom(this.client.garbageCollection());
    }
    catch (e) {
      const pd = e as HttpErrorResponse;
      if (pd) {
        console.error('Error %d: %o', pd.status, pd);
        // this.formMessage.set(pd.detail ?? 'Saving changes failed');
      } else {
        console.error('Unknown error while collecting garbage in file storage: %o', e);
        // this.formMessage.set('Saving changes failed (reason unknown)');
      }
    }
  }
}
