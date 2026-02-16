import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ListPrivileges } from '../widgets/list-privileges/list-privileges';
import { RouterLink } from '@angular/router';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';

@Component({
  selector: 'cal-view-privileges-to',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    HttpResourceViewer,
    ListPrivileges,
    ActionBar,
    TranslocoDirective,
  ],
  templateUrl: './view-privileges-to.html',
  styleUrl: './view-privileges-to.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPrivilegesTo {
  public username = input.required<string>();
  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);

  public grantorUri = computed(() => {
    const username = this.username();
    return username ? `/${username}/` : undefined;
  });

  public readonly privileges = this.calendareResource.getPrivilegesOutgoing(this.grantorUri);

  refresh() {
    this.privileges.reload();
  }

  public async recalc() {
    try {
      await firstValueFrom(this.client.recalcGroupmembership(this.username()));
      this.refresh();
    } catch (e: unknown) {
      const pd = e as HttpErrorResponse;
      if (pd) {
        console.error('Error %d: %o', pd.status, pd);
        // this.formMessage.set(pd.detail ?? 'Saving changes failed');
      } else {
        console.error('Unknown error while amending collection: %o', e);
        // this.formMessage.set('Saving changes failed (reason unknown)');
      }
    }
  }
}
