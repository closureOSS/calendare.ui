import { Component, inject } from '@angular/core';
import { EditTrxJournal } from '../edit-trx-journal/edit-trx-journal';
import { TranslocoDirective } from '@jsverse/transloco';
import { CalendareResource } from '../../api/resources';
import { PermissionResponse } from '../../api';
import { PrivilegeMask } from '../core/privilege-mask';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { EditTrxGc } from '../edit-trx-gc/edit-trx-gc';
import { SiteTitle } from '../a9uitemplate/site-title/site-title';

@Component({
  selector: 'cal-page-maintenance',
  imports: [
    EditTrxJournal,
    EditTrxGc,
    HintBox,
    SiteTitle,
    TranslocoDirective,
  ],
  templateUrl: './page-maintenance.html',
})
export class PageMaintenance {
  private readonly calendareResource = inject(CalendareResource);
  public readonly adminPermissions = this.calendareResource.getPermissionsSelf(undefined);

  refresh() {
    this.adminPermissions.reload();
  }

  public canOperateSystem(permissions: PermissionResponse | undefined) {
    if (!permissions || !permissions.administration) return false;
    return (permissions.administration & PrivilegeMask.WriteAcl) !== PrivilegeMask.None;
  }
}
