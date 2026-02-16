import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { PrivilegeMask, CollectionType } from '../../api';
import { CalendareResource } from '../../api/resources';
import { CurrentUserInfoJwt } from '../core/current-user-info';
import { hasPermission } from '../core/has-permissions';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { ViewPrincipal } from '../view-principal/view-principal';
import { ViewMember } from '../view-member/view-member';
import { ViewMemberships } from '../view-memberships/view-memberships';
import { EditEmailConfirm } from '../edit-email-confirm/edit-email-confirm';

@Component({
  selector: 'cal-page-my-principal',
  imports: [
    MatButtonModule,
    MatIconModule,
    ViewMember,
    ViewMemberships,
    ViewPrincipal,
    EditEmailConfirm,
    TranslocoDirective
  ],
  templateUrl: './page-my-principal.html',
  styleUrl: './page-my-principal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageMyPrincipal {
  private readonly currentUserInfo = inject(CurrentUserInfoJwt);
  public username = computed(() => {
    const account = this.currentUserInfo.account();
    return account ? account.username : null;
  });

  private readonly calendareResource = inject(CalendareResource);

  public readonly principal = this.username() ? this.calendareResource.getUser(this.username()!) : null;


  public hasPermission(permissions: PrivilegeMask | undefined | null, required: PrivilegeMask | PrivilegeMaskConstant): boolean {
    return hasPermission(permissions, required);
  }

  public refresh() {
    this.principal?.reload();
  }

  readonly PrivilegeMask = PrivilegeMaskConstant;
  readonly CollectionType = CollectionType;
}
