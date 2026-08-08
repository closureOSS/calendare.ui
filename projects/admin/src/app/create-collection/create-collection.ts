import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCollectionFormData } from './create-collection-form.interface';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { CalendareService } from '../../api/services';
import { CollectionType } from '../../api/models';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { form, FormField, FormRoot, hidden, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { FormError } from '../a9uitemplate/form-error/form-error';
import { FieldError } from '../a9uitemplate/field-error/field-error';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matRestartAltOutline } from '@ng-icons/material-symbols/outline';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
  selector: 'cal-create-collection',
  imports: [
    FormField,
    FormRoot,
    HlmCardImports,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmInputImports,
    HlmFieldImports,
    HlmSelectImports,
    NgIcon,
    NavigateBackButton,
    FormError,
    FieldError,
    TranslocoDirective,
  ],
  viewProviders: [
    provideIcons({
      matRestartAltOutline,
    }),
  ],
  templateUrl: './create-collection.html',
})
export class CreateCollection {
  public username = input.required<string>();
  public collectionTypeLabel = input<CollectionType>();
  transloco = inject(TranslocoService);

  private readonly client = inject(CalendareService);
  protected readonly formModel = signal<CreateCollectionFormData>({
    uri: uuidv4(),
    collectionType: null,
  });

  private readonly router = inject(Router);
  readonly editForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.uri, { message: this.transloco.translate('URI is required') });
    minLength(schemaPath.uri, 1, { message: this.transloco.translate('URI is required') });
    maxLength(schemaPath.uri, 48, { message: this.transloco.translate('URI should not exceed 48 characters') });
    pattern(schemaPath.uri, /^[0-9|a-z|.|-]+$/, { message: this.transloco.translate('Lowercase only, a-z or 0-9 or dot or hypen') });
    required(schemaPath.collectionType, {
      when: ({ valueOf }) => this.collectionTypeLabel() !== undefined || !!valueOf,
      message: this.transloco.translate('Type of collection is required'),
    });
    // validate(schemaPath.collectionType, ({ value }) => {
    //   console.log('validate:', value(), this.collectionTypeLabel());
    //   if (this.collectionTypeLabel()) {
    //     return null;
    //   }
    //   if (value() === null) {
    //     return { kind: 'required', message: this.transloco.translate('Type of collection is required'), }
    //   }
    //   return null;
    // });
    hidden(schemaPath.collectionType, { when: () => this.collectionTypeLabel() !== undefined });
  },
    {
      submission: {
        action: async (field) => {
          // console.log(this.editForm().valid(), this.formModel(), this.ToDomainModel(this.formModel()));
          try {
            const collectionUri = `/${this.username()}/${field.uri().value()}/`;
            const collectionType = this.collectionTypeLabel() ?? field.collectionType()?.value() ?? undefined;
            console.log('submission %s %s', collectionUri, collectionType);
            await firstValueFrom(this.client.createCollection({
              uri: collectionUri,
              collectionType: collectionType,
            }));
            field().reset();
            await this.router.navigate(['/collection', 'edit', this.username()], { queryParams: { uri: collectionUri }, replaceUrl: true });
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

  public refresh() {
    this.formModel.set({
      uri: uuidv4(),
      collectionType: this.collectionTypeLabel() ?? null
    });
  }
}
