import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PrincipalRef } from "../principal-ref/principal-ref";
import { PrivilegeGroupResponse, PrivilegeLineResponse } from '../../../api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { ListGrantDetails } from '../list-grant-details/list-grant-details';

@Component({
  selector: 'cal-list-privileges',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    PrincipalRef,
    ListGrantDetails,
    TranslocoDirective,
  ],
  templateUrl: './list-privileges.html',
  styleUrl: './list-privileges.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPrivileges {
  privilegeGroups = input.required<PrivilegeGroupResponse[]>();
  editable = input<boolean>(false);
  direction = input<boolean>(false);
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
