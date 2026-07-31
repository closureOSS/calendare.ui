import { booleanAttribute, Component, computed, inject, input, linkedSignal, model, output } from '@angular/core';
import { PrincipalCreateFormData } from './principal-create-form.interface';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { email, form, FormField, FormRoot, readonly, required } from '@angular/forms/signals';
import { usernameConfig } from '../widgets/form-username-config';
import { HlmAutocompleteImports } from '@spartan-ng/helm/autocomplete';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { FieldError } from '../a9uitemplate/field-error/field-error';
import { FormError } from '../a9uitemplate/form-error/form-error';
import { InputTimezone } from '../a9uitemplate/input-timezone/input-timezone';

@Component({
  selector: 'cal-form-principal-create',
  imports: [
    FormField,
    FormRoot,
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
    HintBox,
    TranslocoDirective,
  ],
  templateUrl: './form-principal-create.html',
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

  public search = linkedSignal({
    source: () => this.editForm.timezone().value(),
    computation: (item) => item ?? '',
  });

  public readonly filteredOptions = computed(() =>
    Intl.supportedValuesOf('timeZone').filter((tz) => tz.toLowerCase().includes(this.search().toLowerCase())),
  );
}
