import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PrincipalRef } from '../widgets/principal-ref/principal-ref';
import { CalendareResource } from '../../api/resources';
import { MembershipDirection } from '../../api';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatCardModule } from '@angular/material/card';
import { HintBox } from "../a9uitemplate/hint-box/hint-box";
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';

@Component({
  selector: 'cal-view-memberships',
  imports: [
    MatButtonModule,
    MatCardModule,
    RouterLink,
    HttpResourceViewer,
    PrincipalRef,
    TranslocoDirective,
    HintBox
],
  templateUrl: './view-memberships.html',
  styleUrl: './view-memberships.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewMemberships {
  public username = input.required<string>();
  private readonly calendareResource = inject(CalendareResource);

  public principal = computed(() => {
    const username = this.username();
    return username ? username : undefined;
  });

  public readonly memberships = this.calendareResource.getMemberships(this.principal, MembershipDirection.Memberships);
}
