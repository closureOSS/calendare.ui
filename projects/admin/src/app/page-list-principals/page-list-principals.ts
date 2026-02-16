import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { CalendareResource } from '../../api/resources';
import { TranslocoDirective } from '@jsverse/transloco';
import { PageResponsiveness } from '../a9uitemplate/page-responsiveness';
import { CreatePrincipalButton } from '../create-principal-button/create-principal-button';
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
// import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpResourceViewer } from '../a9uitemplate/http-resource-viewer/http-resource-viewer';
import { FilterBar } from '../a9uitemplate/filter-bar/filter-bar';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';

@Component({
  selector: 'cal-page-list-principals',
  imports: [
    RouterLink,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpResourceViewer,
    CreatePrincipalButton,
    IconPrincipalType,
    FloatingActionBar,
    MatTableModule,
    // MatSortModule,
    FilterBar,
    HintBox,
    TranslocoDirective,
    FormsModule,
  ],
  templateUrl: './page-list-principals.html',
  styleUrl: './page-list-principals.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  public readonly permissions = this.calendareResource.getPermissionsSelf(undefined);

  refresh() {
    this.permissions.reload();
    this.principals.reload();
  }

}
