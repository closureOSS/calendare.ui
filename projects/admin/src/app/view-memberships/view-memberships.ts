import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendareResource } from '../../api/resources';
import { MembershipDirection } from '../../api';
import { TranslocoDirective } from '@jsverse/transloco';
import { HintBox } from "../a9uitemplate/hint-box/hint-box";
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';

@Component({
  selector: 'cal-view-memberships',
  imports: [
    HlmCardImports,
    HlmItemImports,
    RouterLink,
    HttpResourceViewer,
    IconPrincipalType,
    TranslocoDirective,
    HintBox
  ],
  templateUrl: './view-memberships.html',
})
export class ViewMemberships {
  protected hlmGroup = `font-bold text-sm text-primary py-4`;
  public username = input.required<string>();
  private readonly calendareResource = inject(CalendareResource);

  public principal = computed(() => {
    const username = this.username();
    return username ? username : undefined;
  });

  public readonly memberships = this.calendareResource.getMemberships(this.principal, MembershipDirection.Memberships);
}
