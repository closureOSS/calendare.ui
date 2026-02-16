import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCollectionFormData } from './create-collection-form.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { CalendareService } from '../../api/services';
import { CollectionCreateRequest, CollectionType } from '../../api/models';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { MatCardModule } from '@angular/material/card';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cal-create-collection',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    NavigateBackButton,
    HintBox,
    ActionBar,
    TranslocoDirective
  ],
  templateUrl: './create-collection.html',
  styleUrl: './create-collection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollection {
  public username = input.required<string>();
  public collectionTypeLabel = input<CollectionType>();

  private readonly client = inject(CalendareService);


  private readonly formBuilder = inject(FormBuilder);
  public form: FormGroup;
  private readonly router = inject(Router);
  public formMessage = signal<string | null>(null);

  constructor() {
    this.form = this.formBuilder.group<CreateCollectionFormData>({
      collectionType: '',
      uri: uuidv4(),
    }, { updateOn: 'blur' });
    this.form.get('uri')?.addValidators([
      Validators.required,
      Validators.minLength(1), Validators.maxLength(48),
      Validators.pattern('[0-9|a-z|.|-]+')
    ]);
    this.form.get('collectionType')?.addValidators([Validators.required, Validators.minLength(1)]);

    effect(() => {
      if (this.collectionTypeLabel()) {
        this.form.get('collectionType')?.setValue(this.collectionTypeLabel());
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
    this.form.reset();
  }

  transloco = inject(TranslocoService);
  public async submitForm() {
    if (!this.form.valid) {
      this.formMessage.set(this.transloco.translate('Data is invalid, please correct input first'));
      return;
    }
    const collectionUri = `/${this.username()}/${this.form.value.uri}/`;
    // console.log(this.form.valid);
    console.log(this.form.value as CollectionCreateRequest);
    try {
      await firstValueFrom(this.client.createCollection({
        uri: collectionUri,
        collectionType: this.form.value.collectionType,
      }));
      this.form.markAsPristine();
      await this.router.navigate(['/collection', 'edit', this.username()], { queryParams: { uri: collectionUri }, replaceUrl: true });
    }
    catch (e) {
      const pd = e as HttpErrorResponse;
      if (pd) {
        console.error('Error %d: %o', pd.status, pd);
        this.formMessage.set(pd.message ?? 'Creating collection failed');
      } else {
        console.error('Unknown error while creating collection: %o', e);
        this.formMessage.set('Creating collection failed with unknown reason');
      }
    }
  }
}
