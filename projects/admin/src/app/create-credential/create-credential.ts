import { Component, inject, input, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { CalendareService } from '../../api/services';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { form, FormField, FormRoot, max, min, minLength, required } from '@angular/forms/signals';
import { CreateCredentialFormData } from './create-credential-form.interface';
import { UserCredentialCreateRequest, UserCredentialCreateTemplate } from '../../api/models';
import { httpErrorToProblemDetails } from '../core/http-error-helper';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { FieldError } from '../a9uitemplate/field-error/field-error';
import { FormError } from '../a9uitemplate/form-error/form-error';
import { CredentialDialogProvider } from '../dialog-credential-created/credential-dialog-provider';

@Component({
  selector: 'cal-create-credential',
  imports: [
    FormField,
    FormRoot,
    HlmCardImports,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmLabelImports,
    HlmRadioGroupImports,
    HlmFieldImports,
    HlmInputImports,
    HlmCheckboxImports,
    FieldError,
    FormError,
    NavigateBackButton,
    TranslocoDirective
  ],
  providers:[
    CredentialDialogProvider,
  ],
  templateUrl: './create-credential.html',
})
export class CreateCredential {
  public username = input.required<string>();
  transloco = inject(TranslocoService);
  readonly dialog = inject(CredentialDialogProvider);

  private readonly client = inject(CalendareService);
  protected readonly formModel = signal<CreateCredentialFormData>({
    description: '',
    scope: 255,
  });

  readonly editForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.description, { message: this.transloco.translate('Label/description is required') });
    minLength(schemaPath.description, 5, { message: this.transloco.translate('At least *min characters are required', { min: 5 }) });
    required(schemaPath.scope, { message: this.transloco.translate('Scope is required') });
    min(schemaPath.scope, 1, { message: this.transloco.translate('Scope is required') });
    max(schemaPath.scope, 255, { message: this.transloco.translate('Scope is required') });
  },
    {
      submission: {
        action: async (field) => {
          // console.log(this.editForm().valid(), this.formModel(), this.ToDomainModel(this.formModel()));
          try {
            const request: UserCredentialCreateRequest = {
              template: UserCredentialCreateTemplate.ApplicationKey,
              description: field.description().value(),
              // scope: field.scope().value(),
            };
            const credential = await firstValueFrom(this.client.createCredential(this.username(), request));
            const ref = await this.dialog.show(credential,UserCredentialCreateTemplate.ApplicationKey);
            field().reset();
            this.back();
            return;
          }
          catch (e) {
            const pd = httpErrorToProblemDetails(e);
            console.error('Error creating credential: %o', pd);
            switch (pd.status) {
              case HttpStatusCode.Conflict:
                return { kind: 'serverError', message: this.transloco.translate('Credential already exists') };
              default:
                return { kind: 'serverError', message: `${this.transloco.translate('Creating credential failed')} ${this.transloco.translate(pd.title ?? '')}` };
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
}
