import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ViewCollections } from '../view-collections/view-collections';
import { PrivilegeMask, CollectionType } from '../../api';
import { CalendareResource } from '../../api/resources';
import { CurrentUserInfoJwt } from '../core/current-user-info';
import { hasPermission } from '../core/has-permissions';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { matCreateNewFolderOutline } from '@ng-icons/material-symbols/outline';
import { SiteTitle } from "../a9uitemplate/site-title/site-title";

@Component({
  selector: 'cal-page-my-collections',
  imports: [
    HlmButtonImports,
    NgIcon,
    RouterLink,
    ViewCollections,
    FloatingActionBar,
    TranslocoDirective,
    SiteTitle
],
  viewProviders: [
    provideIcons({
       matCreateNewFolderOutline,
    })
  ],
  templateUrl: './page-my-collections.html',
})
export class PageMyCollections {
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
