import { Component, ElementRef, inject, input, linkedSignal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { EditCollectionFormData } from './edit-collection-form.interface';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { LocationStrategy } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { MatCardModule } from '@angular/material/card';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { CollectionAmendRequest, CollectionResponse } from '../../api';
import { emptyToNullString, nullToEmptyString, nullToFalse } from '../../api/utils/form-helpers';

@Component({
  selector: 'cal-edit-collection',
  imports: [
    MatButtonModule,
    MatIconModule,
    FormField,
    FormRoot,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    HintBox,
    ActionBar,
    TranslocoDirective,
  ],
  templateUrl: './edit-collection.html',
  styleUrl: './edit-collection.scss',

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
      }
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

  public filteredOptions: string[] = [];
  public timezoneInput = viewChild.required<ElementRef>('timezoneinput');
  filterTimezones(): void {
    const filterValue = this.timezoneInput()?.nativeElement?.value?.toLowerCase();
    this.filteredOptions = filterValue ? Intl.supportedValuesOf('timeZone').filter(o => o?.toLowerCase().includes(filterValue)) : Intl.supportedValuesOf('timeZone');
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
