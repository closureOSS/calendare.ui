import { Component, ElementRef, inject, input, linkedSignal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditPrincipalFormData } from './edit-principal-form.interface';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';
import { CalendareService } from '../../api/services';
import { CalendareResource } from '../../api/resources';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { LocationStrategy } from '@angular/common';
import { MatCardHeader, MatCardContent, MatCardActions, MatCardModule } from "@angular/material/card";
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { PrincipalResponse, UserAmendRequest } from '../../api';
import { emptyToNullString, nullToEmptyString } from '../../api/utils/form-helpers';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { FormSignalError } from '../a9uitemplate/form-signal-error';

@Component({
  selector: 'cal-edit-principal',
  imports: [
    MatButtonModule,
    MatIconModule,
    FormField,
    FormRoot,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    HintBox,
    IconPrincipalType,
    ActionBar,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    FormSignalError,
    TranslocoDirective,
  ],
  templateUrl: './edit-principal.html',
  styleUrl: './edit-principal.scss',

})
export class EditPrincipal {
  public username = input.required<string>();

  transloco = inject(TranslocoService);
  private readonly calendareResource = inject(CalendareResource);
  public readonly principal = this.calendareResource.getUser(this.username);
  protected readonly formModel = linkedSignal({
    source: this.principal.value,
    computation: (domainModel) => this.toFormModel(domainModel)
  });

  private readonly client = inject(CalendareService);
  readonly editForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.timezone, { message: this.transloco.translate('Timezone is required') });
    required(schemaPath.email, { message: this.transloco.translate('Email is required') });
    email(schemaPath.email, { message: this.transloco.translate('Please enter a valid email address') });
  },
    {
      submission: {
        action: async (field) => {
          // console.log(this.editForm().valid(), this.formModel(), this.ToDomainModel(this.formModel()));
          try {
            await firstValueFrom(this.client.updateUser(this.username(), this.toDomainModel(this.formModel())));
            field().reset();
            this.back();
            return;
          }
          catch (e) {
            const pd = e as HttpErrorResponse;
            if (pd) {
              console.error('Error %d: %o', pd.status, pd);
              return { kind: 'serverError', message: pd.message ?? this.transloco.translate('Saving changes failed') };
            } else {
              console.error('Unknown error while amending collection: %o', e);
              return { kind: 'serverError', message: this.transloco.translate('Saving changes failed (reason unknown)') };
            }
          }
        },
        onInvalid: (field) => {
          const firstError = field().errorSummary()[0];
          firstError?.fieldTree().focusBoundControl();
        },
      }
    }
  );

  private readonly location = inject(LocationStrategy);
  back() {
    this.location.back();
  }

  private readonly confirm = inject(ConfirmDialogProvider);
  public async confirmCancel(): Promise<boolean> {
    if (!this.editForm().dirty()) return true;
    return await this.confirm.ask();
  }

  // public refresh() {
  //   this.principal.reload();
  // }

  public filteredOptions: string[] = [];
  public timezoneInput = viewChild.required<ElementRef>('timezoneinput');
  filterTimezones(): void {
    const filterValue = this.timezoneInput()?.nativeElement?.value?.toLowerCase();
    this.filteredOptions = filterValue ? Intl.supportedValuesOf('timeZone').filter(o => o?.toLowerCase().includes(filterValue)) : Intl.supportedValuesOf('timeZone');
  }

  protected toFormModel(data: PrincipalResponse | null | undefined): EditPrincipalFormData {
    return {
      displayName: nullToEmptyString(data?.displayName),
      timezone: nullToEmptyString(data?.timezone),
      email: nullToEmptyString(data?.email),
      description: nullToEmptyString(data?.description),
      color: nullToEmptyString(data?.color),
      locale: nullToEmptyString(data?.locale),
      dateFormatType: nullToEmptyString(data?.dateFormatType),
    } as EditPrincipalFormData;
  }
  protected toDomainModel(data: EditPrincipalFormData): UserAmendRequest {
    return {
      displayName: emptyToNullString(data.displayName),
      timezone: emptyToNullString(data?.timezone),
      email: emptyToNullString(data?.email),
      description: data.description,
      color: emptyToNullString(data?.color),
      locale: emptyToNullString(data?.locale),
      dateFormatType: emptyToNullString(data.dateFormatType),
    } as UserAmendRequest;
  }
}
