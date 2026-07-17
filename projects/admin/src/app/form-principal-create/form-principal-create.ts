import { booleanAttribute, Component, ElementRef, inject, input, linkedSignal, model, output, viewChild } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PrincipalCreateFormData } from './principal-create-form.interface';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { email, form, FormField, FormRoot, maxLength, minLength, pattern, readonly, required } from '@angular/forms/signals';
import { FormSignalError } from '../a9uitemplate/form-signal-error';
import { usernameConfig } from '../widgets/form-username-config';

@Component({
  selector: 'cal-form-principal-create',
  imports: [
    MatButtonModule,
    MatIconModule,
    FormField,
    FormRoot,
    MatFormFieldModule,
    FormSignalError,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    HintBox,
    ActionBar,
    TranslocoDirective,
  ],
  templateUrl: './form-principal-create.html',
  styleUrl: './form-principal-create.scss',

})
export class FormPrincipalCreate {
  public readonly readonlyEmail = input(false, { transform: booleanAttribute });
  public readonly defaultData = input<Partial<PrincipalCreateFormData> | null>();
  transloco = inject(TranslocoService);

  public msg = model<string | null>(null);
  public data = output<PrincipalCreateFormData>();

  protected readonly formModel = linkedSignal({
    source: this.defaultData,
    computation: (data) => {
      return {
        username: data?.username ?? '',
        email: data?.email ?? '',
        displayName: data?.displayName ?? '',
        description: data?.description ?? '',
        timezone: data?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
        color: data?.color ?? '',
      } as PrincipalCreateFormData;
    }
  });

  readonly editForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.email, { message: this.transloco.translate('Email is required') });
    email(schemaPath.email, { message: this.transloco.translate('Email is not valid') });
    readonly(schemaPath.email, { when: () => this.readonlyEmail() });
    required(schemaPath.timezone, { message: this.transloco.translate('Timezone is required') });
    usernameConfig(schemaPath.username, this.transloco);
  }, {
    submission: {
      action: async (field) => {
        //console.log(this.editForm().valid(), this.formModel());
        this.data.emit(this.formModel());
        field().reset();
        return;
      },
      onInvalid: (field) => {
        const firstError = field().errorSummary()[0];
        firstError?.fieldTree().focusBoundControl();
      },
    }
  });

  public filteredOptions: string[] = [];
  public timezoneInput = viewChild.required<ElementRef>('timezoneinput');
  filterTimezones(): void {
    const filterValue = this.timezoneInput()?.nativeElement?.value?.toLowerCase();
    this.filteredOptions = filterValue ? Intl.supportedValuesOf('timeZone').filter(o => o?.toLowerCase().includes(filterValue)) : Intl.supportedValuesOf('timeZone');
  }
}
