import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';
import { EditPermissions } from '../widgets/edit-permissions/edit-permissions';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PrivilegeMask } from '../../api';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';

@Component({
  selector: 'cal-edit-principal-permissions',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    NavigateBackButton,
    IconPrincipalType,
    EditPermissions,
    ActionBar,
    TranslocoDirective,
  ],
  templateUrl: './edit-principal-permissions.html',
  styleUrl: './edit-principal-permissions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPrincipalPermissions {
  public username = input.required<string>();

  private readonly client = inject(CalendareService);
  private readonly calendareResource = inject(CalendareResource);

  public target = computed(() => {
    const username = this.username();
    return username ? `/${username}/` : '/';
  });


  // principalResource = resource({
  //   params: () => ({ username: this.username() }),
  //   loader: ({ params }) => {
  //     return this.client.api.permission.get({ queryParameters: { uri: `/${params.username}/` } });
  //   }
  // });
  // public principal = computed(() => this.principalResource.hasValue() ? this.principalResource.value() : null);
  public readonly principal = this.calendareResource.getPermissions(this.target);


  public globalPermitSelf = linkedSignal(() => this.principal.value()?.globalPermitSelf ?? PrivilegeMask._0);
  public authorizedProhibit = linkedSignal(() => this.principal.value()?.authorizedProhibit ?? PrivilegeMask._0);
  public ownerProhibit = linkedSignal(() => this.principal.value()?.ownerProhibit ?? PrivilegeMask._0);

  public dirty = computed(() => {
    if (this.principal.value()) {
      if ((this.principal.value()?.globalPermitSelf ?? PrivilegeMaskConstant.None) !== this.globalPermitSelf()) {
        return true;
      }
      if ((this.principal.value()?.authorizedProhibit ?? PrivilegeMaskConstant.None) !== this.authorizedProhibit()) {
        return true;
      }
      if ((this.principal.value()?.ownerProhibit ?? PrivilegeMaskConstant.None) !== this.ownerProhibit()) {
        return true;
      }
    }
    return false;
  });

  private readonly confirm = inject(ConfirmDialogProvider);
  public async confirmCancel(): Promise<boolean> {
    if (!this.dirty()) return true;
    return await this.confirm.ask();
  }

  private readonly location = inject(LocationStrategy);
  back() {
    this.location.back();
  }

  public refresh() {
    this.principal.reload();
  }

  async submit() {
    try {
      await firstValueFrom(this.client.setPermissions({
        uri: this.principal.value()!.uri!,
        globalPermitSelf: this.globalPermitSelf(),
        authorizedProhibit: this.authorizedProhibit(),
        ownerProhibit: this.ownerProhibit(),
      }));
      // await this.client.api.permission.patch({
      //   uri: this.principal.value()?.uri,
      //   globalPermitSelf: this.globalPermitSelf(),
      //   authorizedProhibit: this.authorizedProhibit(),
      //   ownerProhibit: this.ownerProhibit(),
      // });
      this.refresh();
    }
    catch (e) {
      const pd = e as HttpErrorResponse;
      if (pd) {
        console.error('Error %d: %o', pd.status, pd);
        // this.formMessage.set(pd.detail ?? 'Saving changes failed');
      } else {
        console.error('Unknown error while amending collection: %o', e);
        // this.formMessage.set('Saving changes failed (reason unknown)');
      }
    }
  }
}
