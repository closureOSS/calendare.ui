import { Component, input } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { PermissionResponse } from '../../api';
import { RouterLink } from '@angular/router';
import { PrivilegeMask } from '../core/privilege-mask';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { matPersonAddOutline } from '@ng-icons/material-symbols/outline';
import { LabelPrincipalType, PrincipalTypes } from '../widgets/label-principal-type/label-principal-type';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';

@Component({
  selector: 'cal-create-principal-button',
  imports: [
    NgIcon,
    HlmDropdownMenuImports,
    HlmButtonImports,
    LabelPrincipalType,
    IconPrincipalType,
    RouterLink,
    TranslocoDirective,
  ],
  viewProviders: [
    provideIcons({
      matPersonAddOutline,
    }),
  ],
  templateUrl: './create-principal-button.html',
})
export class CreatePrincipalButton {
  protected PrincipalTypes = PrincipalTypes;
  public permissions = input.required<PermissionResponse | undefined>();
  public canCreatePrincipal(permissions: PermissionResponse | undefined) {
    if (!permissions || !permissions.administration) return false;
    return (permissions.administration & PrivilegeMask.Bind) !== PrivilegeMask.None;
  }
}
