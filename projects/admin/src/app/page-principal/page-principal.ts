import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ViewCollections } from '../view-collections/view-collections';
import { ViewCredentials } from '../view-credentials/view-credentials';
import { ViewPrincipal } from '../view-principal/view-principal';
import { ViewPrivilegesTo } from "../view-privileges-to/view-privileges-to";
import { ViewPrivilegesFrom } from '../view-privileges-from/view-privileges-from';
import { ViewMemberships } from "../view-memberships/view-memberships";
import { ViewMember } from '../view-member/view-member';
import { hasPermission } from '../core/has-permissions';
import { ListPermissions } from "../widgets/list-permissions/list-permissions";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CalendareResource } from '../../api/resources';
import { PrivilegeMask } from '../../api';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { TranslocoDirective } from '@jsverse/transloco';
import { CreateCredentialButton } from "../create-credential-button/create-credential-button";
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { EditEmailConfirm } from '../edit-email-confirm/edit-email-confirm';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    ViewCredentials,
    ViewCollections,
    ViewPrincipal,
    ViewPrivilegesTo,
    ViewPrivilegesFrom,
    ViewMemberships,
    ViewMember,
    EditEmailConfirm,
    FloatingActionBar,
    ListPermissions,
    RouterLink,
    NavigateBackButton,
    CreateCredentialButton,
    TranslocoDirective,
  ],
  templateUrl: './page-principal.html',
  styleUrl: './page-principal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagePrincipal {
  public username = input.required<string>();
  private readonly calendareResource = inject(CalendareResource);
  readonly PrivilegeMask = PrivilegeMaskConstant;

  private usernameSafe = computed(() => {
    const username = this.username();
    return username ? username : undefined;
  });
  public reload = signal<number>(0);
  public refreshCredentials() {
    this.reload.update(value => value + 1);
  }

  // principalResource = resource({
  //   params: () => ({ username: this.username() }),
  //   loader: ({ params }) => {
  //     return this.client.api.user.byUsername(params.username).get();
  //   }
  // });
  // public readonly principal = computed(() => this.principalResource.hasValue() ? this.principalResource.value() : null);

  public readonly principal = this.calendareResource.getUser(this.username);

  public refresh() {
    this.principal?.reload();
  }

  public hasPermission(permissions: PrivilegeMask | undefined | null, required: PrivilegeMask | PrivilegeMaskConstant): boolean {
    return hasPermission(permissions, required);
  }
}
