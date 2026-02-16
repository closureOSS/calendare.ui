import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { CurrentUserInfoJwt } from '../core/current-user-info';
import { ViewCollections } from '../view-collections/view-collections';
import { CalendareResource } from '../../api/resources';
import { CollectionType, PrivilegeMask } from '../../api/models';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { hasPermission } from '../core/has-permissions';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';

@Component({
  selector: 'cal-page-my-calendars',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ViewCollections,
    FloatingActionBar,
    TranslocoDirective
  ],
  templateUrl: './page-my-calendars.html',
  styleUrl: './page-my-calendars.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageMyCalendars {
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
