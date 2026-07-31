import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { CalendareResource } from '../../api/resources';
import { TranslocoDirective } from '@jsverse/transloco';
import { PageResponsiveness } from '../a9uitemplate/page-responsiveness';
import { CreatePrincipalButton } from '../create-principal-button/create-principal-button';
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { matFilterListOutline, matGroupFillOutline, matMeetingRoomFillOutline, matPerson2FillOutline, matSearchOutline, matSpeakerFillOutline } from '@ng-icons/material-symbols/outline';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmTableImports } from '@spartan-ng/helm/table';

@Component({
  selector: 'cal-page-list-principals',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpResourceViewer,
    CreatePrincipalButton,
    IconPrincipalType,
    FloatingActionBar,
    HintBox,
    TranslocoDirective,
    FormsModule,
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
      matPerson2FillOutline, matMeetingRoomFillOutline,
      matSpeakerFillOutline, matGroupFillOutline,
      matSearchOutline, matFilterListOutline,
    }),
  ],
  templateUrl: './page-list-principals.html',
})
export class PageListPrincipals {
  private readonly calendareResource = inject(CalendareResource);
  protected readonly responsiveness = inject(PageResponsiveness);
  protected readonly searchFld = new FormControl<string>('');
  private searchTerm = toSignal(this.searchFld.valueChanges.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    map(x => x ?? '')
  ));
  protected filterByType = signal<string[]>(['INDIVIDUAL', 'ROOM', 'RESOURCE', 'GROUP']);

  readonly principalFilterMask =
    PrivilegeMaskConstant.ScheduleDeliverReply | PrivilegeMaskConstant.ScheduleQueryFreebusy |
    PrivilegeMaskConstant.ScheduleSendReply | PrivilegeMaskConstant.ScheduleSendFreebusy;

  public readonly principals = this.calendareResource.getUserList(this.filterByType, this.searchTerm, false, true, undefined);
  public readonly adminPermissions = this.calendareResource.getPermissionsSelf(undefined);

  refresh() {
    this.adminPermissions.reload();
    this.principals.reload();
  }
}
