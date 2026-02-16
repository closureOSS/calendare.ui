import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ViewCollections } from '../view-collections/view-collections';
import { PrivilegeMask, CollectionType } from '../../api';
import { CalendareResource } from '../../api/resources';
import { CurrentUserInfoJwt } from '../core/current-user-info';
import { hasPermission } from '../core/has-permissions';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';

@Component({
  selector: 'cal-page-my-addressbooks',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ViewCollections,
    FloatingActionBar,
    TranslocoDirective
  ],
  templateUrl: './page-my-addressbooks.html',
  styleUrl: './page-my-addressbooks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageMyAddressbooks {
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
