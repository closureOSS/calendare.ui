import { Component, inject, input, linkedSignal } from '@angular/core';
import { EditPrincipalFormData } from './edit-principal-form.interface';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';
import { CalendareService } from '../../api/services';
import { CalendareResource } from '../../api/resources';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { PrincipalResponse, UserAmendRequest } from '../../api';
import { emptyToNullString, nullToEmptyString } from '../../api/utils/form-helpers';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { FormError } from '../a9uitemplate/form-error/form-error';
import { FieldError } from '../a9uitemplate/field-error/field-error';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { InputTimezone } from '../a9uitemplate/input-timezone/input-timezone';

@Component({
  selector: 'cal-edit-principal',
  imports: [
    FormField,
    FormRoot,
    HlmCardImports,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmInputImports,
    HlmFieldImports,
    HlmSelectImports,
    HlmTextareaImports,
    HlmCheckboxImports,
    InputTimezone,
    FormError,
    FieldError,
    IconPrincipalType,
    TranslocoDirective,
  ],
  templateUrl: './edit-principal.html',
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
