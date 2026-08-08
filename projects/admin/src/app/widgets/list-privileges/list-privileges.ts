import { booleanAttribute, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrincipalRef } from "../principal-ref/principal-ref";
import { PrivilegeGroupResponse, PrivilegeLineResponse } from '../../../api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { ListGrantDetails } from '../list-grant-details/list-grant-details';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDeleteFillOutline, matDeleteOutline } from '@ng-icons/material-symbols/outline';

@Component({
  selector: 'cal-list-privileges',
  imports: [
    HlmItemImports,
    HlmButtonImports,
    HlmButtonGroupImports,
    NgIcon,
    RouterLink,
    PrincipalRef,
    ListGrantDetails,
    TranslocoDirective,
  ],
  viewProviders: [
    provideIcons({
      matDeleteOutline, matDeleteFillOutline,
    }),
  ],
  templateUrl: './list-privileges.html',
})
export class ListPrivileges {
  protected hlmGroup = `font-bold text-sm text-primary py-4`;
  privilegeGroups = input.required<PrivilegeGroupResponse[]>();
  editable = input<boolean>(false, { transform: booleanAttribute });
  direction = input<boolean>(false, { transform: booleanAttribute });
  doRevoke = output<PrivilegeGroupResponse>();

  public safeUri(path: string | null | undefined): string[] {
    if (!path) { return []; }
    const parts = path.split('/').filter(p => p);
    return parts;
  }

  public async emitRevoke(grp: PrivilegeGroupResponse, line: PrivilegeLineResponse) {
    // console.log(grp, line);
    this.doRevoke.emit({ code: grp.code, name: grp.name, privileges: [line] } as PrivilegeGroupResponse)
  }
}
