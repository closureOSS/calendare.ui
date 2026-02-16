import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditCollectionFormData } from './edit-collection-form.interface';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CalendareResource } from '../../api/resources';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { LocationStrategy } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { MatCardModule } from '@angular/material/card';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';

@Component({
  selector: 'cal-edit-collection',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    HintBox,
    NavigateBackButton,
    ActionBar,
    TranslocoDirective,
  ],
  templateUrl: './edit-collection.html',
  styleUrl: './edit-collection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCollection {
  public username = input.required<string>();
  public uri = input.required<string>();

  private readonly calendareResource = inject(CalendareResource);
  private readonly client = inject(CalendareService);

  private readonly formBuilder = inject(FormBuilder);
  public form: FormGroup;
  private readonly router = inject(Router);
  public formMessage = signal<string | null>(null);

  public readonly collection = this.calendareResource.getCollectionByUri(this.uri);

  constructor() {
    this.form = this.formBuilder.group<EditCollectionFormData>({
      uri: '',
      displayName: '',
      description: '',
      color: null,
      timezone: null,
      excludeFreeBusy: false,
    }, { updateOn: 'blur' });
    this.form.get('uri')?.addValidators([Validators.required]);

    effect(() => {
      const collection = this.collection.value();
      if (collection) {
        this.form.reset(collection, { emitEvent: false });
        if (collection.isDefault) {
          this.form.get('uri')?.disable();
        }
      }
    });
  }

  private readonly location = inject(LocationStrategy);
  back() {
    this.location.back();
  }

  protected dirty(): boolean {
    return this.form.dirty;
  }
  private readonly confirm = inject(ConfirmDialogProvider);
  public async confirmCancel(): Promise<boolean> {
    if (!this.dirty()) return true;
    return await this.confirm.ask();
  }

  public refresh() {
    this.collection.reload();
  }

  transloco = inject(TranslocoService);
  public async submitForm() {
    if (!this.form.valid) {
      this.formMessage.set(this.transloco.translate('Data is invalid, please correct input first'));
      return;
    }
    // console.log(this.form.valid);
    // console.log(this.form.value as CollectionAmendRequest);
    try {
      await firstValueFrom(this.client.amendCollectionByUri(this.form.value, this.uri()));
      this.form.markAsPristine();
      this.back();
    }
    catch (e) {
      const pd = e as HttpErrorResponse;
      if (pd) {
        console.error('Error %d: %o', pd.status, pd);
        this.formMessage.set(pd.message ?? this.transloco.translate('Saving changes failed'));
      } else {
        console.error('Unknown error while amending collection: %o', e);
        this.formMessage.set(this.transloco.translate('Saving changes failed (reason unknown)'));
      }
    }
  }

  public filteredOptions: string[] = [];
  public timezoneInput = viewChild.required<ElementRef>('timezoneinput');
  filterTimezones(): void {
    const filterValue = this.timezoneInput()?.nativeElement?.value?.toLowerCase();
    this.filteredOptions = filterValue ? Intl.supportedValuesOf('timeZone').filter(o => o?.toLowerCase().includes(filterValue)) : Intl.supportedValuesOf('timeZone');
  }
}
