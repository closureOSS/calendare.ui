import { Component, computed, inject, input } from '@angular/core';
import { ListPrivileges } from '../widgets/list-privileges/list-privileges';
import { RouterLink } from '@angular/router';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'cal-view-privileges-to',
  imports: [
    HlmCardImports,
    HlmButtonImports,
    HlmButtonGroupImports,
    RouterLink,
    HttpResourceViewer,
    ListPrivileges,
    TranslocoDirective,
  ],
  templateUrl: './view-privileges-to.html',
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
