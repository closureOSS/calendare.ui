import { Component, inject, input } from '@angular/core';
import { ViewCollections } from '../view-collections/view-collections';
import { ViewCredentials } from '../view-credentials/view-credentials';
import { ViewPrincipal } from '../view-principal/view-principal';
import { ViewPrivilegesTo } from "../view-privileges-to/view-privileges-to";
import { ViewPrivilegesFrom } from '../view-privileges-from/view-privileges-from';
import { ViewMemberships } from "../view-memberships/view-memberships";
import { ViewMember } from '../view-member/view-member';
import { hasPermission } from '../core/has-permissions';
import { ListPermissions } from "../widgets/list-permissions/list-permissions";
import { RouterLink } from '@angular/router';
import { CalendareResource } from '../../api/resources';
import { PrivilegeMask } from '../../api';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { TranslocoDirective } from '@jsverse/transloco';
import { CreateCredentialButton } from "../create-credential-button/create-credential-button";
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { EditEmailConfirm } from '../edit-email-confirm/edit-email-confirm';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matAddBoxFillOutline } from '@ng-icons/material-symbols/outline';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
  imports: [
    HlmButtonImports,
    HlmLabelImports,
    NgIcon,
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
  viewProviders: [
    provideIcons({
      matAddBoxFillOutline,
    }),
  ],
  templateUrl: './page-principal.html',
})
export class PagePrincipal {
  public hlmSectionTitle = 'scroll-m-20 text-base sm:text-xl font-semibold tracking-tight'
  public username = input.required<string>();
  private readonly calendareResource = inject(CalendareResource);
  readonly PrivilegeMask = PrivilegeMaskConstant;

  public readonly principal = this.calendareResource.getUser(this.username);

  public refresh() {
    this.principal?.reload();
  }

  public hasPermission(permissions: PrivilegeMask | undefined | null, required: PrivilegeMask | PrivilegeMaskConstant): boolean {
    return hasPermission(permissions, required);
  }
}
