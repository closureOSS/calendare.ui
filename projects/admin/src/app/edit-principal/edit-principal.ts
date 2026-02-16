import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
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
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { LocationStrategy } from '@angular/common';
import { MatCardHeader, MatCardContent, MatCardActions, MatCardModule } from "@angular/material/card";
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';

@Component({
  selector: 'cal-edit-principal',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    HintBox,
    NavigateBackButton,
    IconPrincipalType,
    ActionBar,
    TranslocoDirective,
    MatCardHeader,
    MatCardContent,
    MatCardActions
  ],
  templateUrl: './edit-principal.html',
  styleUrl: './edit-principal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPrincipal {
  public username = input.required<string>();

  private readonly client = inject(CalendareService);
  private readonly calendareResource = inject(CalendareResource);


  private readonly formBuilder = inject(FormBuilder);
  public form: FormGroup;
  private readonly router = inject(Router);
  public formMessage = signal<string | null>(null);


  // principalResource = resource({
  //   params: () => ({ username: this.username() }),
  //   loader: ({ params }) => {
  //     return this.client.api.user.byUsername(params.username).get();
  //   }
  // });
  // public principal = computed(() => this.principalResource.hasValue() ? this.principalResource.value() : null);
  public readonly principal = this.calendareResource.getUser(this.username);


  constructor() {
    this.form = this.formBuilder.group<EditPrincipalFormData>({
      // uri: '',
      username: '',
      fullname: '',
      displayName: '',
      color: '',
      email: '',
      locale: '',
      dateFormatType: '',
      description: '',
      timezone: null,
    });
    this.form.get('timezone')?.addValidators([Validators.required]);
    this.form.get('email')?.addValidators([Validators.required, Validators.email]);
    this.form.get('uri')?.disable();

    effect(() => {
      const principal = this.principal.value();
      if (principal) {
        this.form.reset(principal, { emitEvent: false });
        // if (collection.isDefaultCollection) {
        //   this.form.get('uri')?.disable();
        // }
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
    this.principal.reload();
  }

  transloco = inject(TranslocoService);
  public async submitForm() {
    if (!this.form.valid) {
      this.formMessage.set(this.transloco.translate('Data is invalid, please correct input first'));
      return;
    }
    console.log('Form valid %s -> %o', this.form.valid, this.form.value as EditPrincipalFormData);
    try {
      await firstValueFrom(this.client.updateUser(this.username(), { ...this.form.value }));
      this.form.markAsPristine();
      this.back();
      // this.router.navigate(['/principal', 'show', this.username()]);
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
