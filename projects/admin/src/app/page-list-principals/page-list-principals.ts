import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';
import { CalendareResource } from '../../api/resources';
import { TranslocoDirective } from '@jsverse/transloco';
import { PageResponsiveness } from '../a9uitemplate/page-responsiveness';
import { CreatePrincipalButton } from '../create-principal-button/create-principal-button';
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { matFilterAltFillOutline, matFilterAltOffFillOutline, matSearchOutline } from '@ng-icons/material-symbols/outline';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { debounce, form, FormField } from '@angular/forms/signals';

export interface PrincipalSearchForm {
  searchterm: string;
  filterByType: string[];
}

@Component({
  selector: 'cal-page-list-principals',
  imports: [
    RouterLink,
    HttpResourceViewer,
    CreatePrincipalButton,
    IconPrincipalType,
    FloatingActionBar,
    HintBox,
    TranslocoDirective,
    FormField,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmInputImports,
    HlmInputGroupImports,
    HlmFieldImports,
    HlmToggleGroupImports,
    HlmItemImports,
    HlmTableImports,
    NgIcon,
  ],
  providers: [
    provideIcons({
      matSearchOutline,
      matFilterAltFillOutline, matFilterAltOffFillOutline,
    }),
  ],
  templateUrl: './page-list-principals.html',
})
export class PageListPrincipals {
  private readonly calendareResource = inject(CalendareResource);
  protected readonly responsiveness = inject(PageResponsiveness);

  searchModel = signal<PrincipalSearchForm>(this.emptySearchForm());
  searchForm = form(this.searchModel, (schemaPath) => {
    debounce(schemaPath.searchterm, 250);
  });

  public readonly principals = this.calendareResource.getUserList(this.searchForm.filterByType().value, this.searchForm.searchterm().value, false, true, undefined);
  public readonly adminPermissions = this.calendareResource.getPermissionsSelf(undefined);

  refresh() {
    this.adminPermissions.reload();
    this.searchForm().reset(this.emptySearchForm());
  }

  private emptySearchForm() {
    return {
      searchterm: '',
      filterByType: ['INDIVIDUAL', 'ROOM', 'RESOURCE', 'GROUP']
    }
  }
}
