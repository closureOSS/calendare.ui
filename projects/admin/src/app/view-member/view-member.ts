import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendareResource } from '../../api/resources';
import { MembershipDirection } from '../../api';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from "@spartan-ng/helm/button-group";
import { HlmItemImports } from '@spartan-ng/helm/item';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';

@Component({
  selector: 'cal-view-member',
  imports: [
    HlmCardImports,
    HlmButtonImports,
    HlmButtonGroupImports,
    HlmItemImports,
    RouterLink,
    HttpResourceViewer,
    IconPrincipalType,
    TranslocoDirective,
],
  templateUrl: './view-member.html',
})
export class ViewMember {
  protected hlmGroup = `font-bold text-sm text-primary py-4`;
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
