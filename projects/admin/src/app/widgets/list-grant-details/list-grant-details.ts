import { Component, input } from '@angular/core';
import { PrivilegeItemResponse } from '../../../api';
import { TranslocoDirective } from '@jsverse/transloco';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCollapseAllFillOutline, matExpandAllFillOutline } from '@ng-icons/material-symbols/outline';

@Component({
  selector: 'cal-list-grant-details',
  imports: [
    TranslocoDirective,
    HlmAccordionImports,
    HlmCollapsibleImports,
    NgIcon,
  ],
  viewProviders: [
    provideIcons({
      matExpandAllFillOutline,
      matCollapseAllFillOutline,
    }),
  ],
  templateUrl: './list-grant-details.html',
})
export class ListGrantDetails {
  grants = input.required<PrivilegeItemResponse[] | undefined>();
}
