import { Component, inject, input, linkedSignal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { EditCollectionFormData } from './edit-collection-form.interface';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { CollectionAmendRequest, CollectionResponse } from '../../api';
import { emptyToNullString, nullToEmptyString, nullToFalse } from '../../api/utils/form-helpers';
import { FormError } from '../a9uitemplate/form-error/form-error';
import { FieldError } from '../a9uitemplate/field-error/field-error';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { InputTimezone } from "../a9uitemplate/input-timezone/input-timezone";

@Component({
  selector: 'cal-edit-collection',
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
    TranslocoDirective,
    InputTimezone
],
  templateUrl: './edit-collection.html',
})
export class EditCollection {
  public username = input.required<string>();
  public uri = input.required<string>();

  transloco = inject(TranslocoService);
  private readonly calendareResource = inject(CalendareResource);
  public readonly collection = this.calendareResource.getCollectionByUri(this.uri);
  protected readonly formModel = linkedSignal({
    source: this.collection.value,
    computation: (domainModel) => this.toFormModel(domainModel)
  });

  private readonly client = inject(CalendareService);
  readonly editForm = form(this.formModel, (schemaPath) => { }, {
    submission: {
      action: async (field) => {
        // console.log(this.editForm().valid(), this.formModel(), this.ToDomainModel(this.formModel()));
        try {
          await firstValueFrom(this.client.amendCollectionByUri(this.toDomainModel(this.formModel()), this.uri()));
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
  });

  private readonly location = inject(LocationStrategy);
  back() {
    this.location.back();
  }

  private readonly confirm = inject(ConfirmDialogProvider);
  public async confirmCancel(): Promise<boolean> {
    if (!this.editForm().dirty()) return true;
    return await this.confirm.ask();
  }

  public refresh() {
    this.collection.reload();
  }

  protected toFormModel(collection: CollectionResponse | null | undefined): EditCollectionFormData {
    return {
      displayName: nullToEmptyString(collection?.displayName),
      description: nullToEmptyString(collection?.description),
      timezone: nullToEmptyString(collection?.timezone),
      color: nullToEmptyString(collection?.color),
      excludeFreeBusy: nullToFalse(collection?.excludeFreeBusy),
    } as EditCollectionFormData;
  }
  protected toDomainModel(data: EditCollectionFormData): CollectionAmendRequest {
    return {
      uri: this.uri(),
      displayName: data.displayName,
      description: data.description,
      timezone: data?.timezone,
      color: emptyToNullString(data.color),
      excludeFreeBusy: data.excludeFreeBusy,
    } as CollectionAmendRequest;
  }
}
