import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PrincipalRef } from '../widgets/principal-ref/principal-ref';
import { CalendareResource } from '../../api/resources';
import { MembershipDirection } from '../../api';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';

@Component({
  selector: 'cal-view-member',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    HttpResourceViewer,
    PrincipalRef,
    ActionBar,
    TranslocoDirective,
  ],
  templateUrl: './view-member.html',
  styleUrl: './view-member.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewMember {
  public username = input.required<string>();
  private readonly calendareResource = inject(CalendareResource);

  public principal = computed(() => {
    const username = this.username();
    return username ? username : undefined;
  });

  public readonly members = this.calendareResource.getMemberships(this.principal, MembershipDirection.Members);

  refresh() {
    this.members.reload();
  }
}
