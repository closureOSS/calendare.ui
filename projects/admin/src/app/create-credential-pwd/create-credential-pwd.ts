import { Component, inject, input, linkedSignal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { CalendareService } from '../../api/services';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { disabled, form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { UserCredentialCreateRequest, UserCredentialCreateTemplate } from '../../api/models';
import { httpErrorToProblemDetails } from '../core/http-error-helper';
import { CreateCredentialPwdFormData } from './create-credential-pwd-form.interface';
import { passwordConfig, usernameConfig } from '../widgets/form-username-config';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { FieldError } from "../a9uitemplate/field-error/field-error";
import { FormError } from "../a9uitemplate/form-error/form-error";
import { CredentialDialogProvider } from '../dialog-credential-created/credential-dialog-provider';

@Component({
  selector: 'cal-create-credential-pwd',
  imports: [
    FormField,
    FormRoot,
    HlmCardImports,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmLabelImports,
    HlmFieldImports,
    HlmInputImports,
    FieldError,
    FormError,
    NavigateBackButton,
    TranslocoDirective,
  ],
  providers: [
    CredentialDialogProvider,
  ],
  templateUrl: './create-credential-pwd.html',
})
export class CreateCredentialPwd {
  public username = input.required<string>();
  public accesskey = input<string>('');
  transloco = inject(TranslocoService);
  readonly dialog = inject(CredentialDialogProvider);

  private readonly client = inject(CalendareService);
  protected readonly formModel = linkedSignal(() => ({
    username: this.accesskey() ?? '',
    password: '',
    passwordConfirm: '',
    description: ''
  } as CreateCredentialPwdFormData
  ));

  readonly editForm = form(this.formModel, (schemaPath) => {
    disabled(schemaPath.username, { when: () => !!this.accesskey() });
    usernameConfig(schemaPath.username, this.transloco);
    passwordConfig(schemaPath.password, this.transloco);
    required(schemaPath.passwordConfirm, { message: this.transloco.translate('Password is required'), when: ({ valueOf }) => valueOf(schemaPath.password) !== '' });
    validate(schemaPath.passwordConfirm, ({ value, valueOf }) => {
      const passwordConfirm = value();
      const password = valueOf(schemaPath.password);
      if (passwordConfirm !== password) {
        return {
          kind: 'passwordMismatch',
          message: this.transloco.translate('Passwords do not match'),
        };
      }
      return null;
    });
  },
    {
      submission: {
        action: async (field) => {
          // console.log(this.editForm().valid(), this.formModel(), this.ToDomainModel(this.formModel()));
          try {
            const request: UserCredentialCreateRequest = {
              template: UserCredentialCreateTemplate.Generic,
              username: field.username().value(),
              password: field.password().value(),
              description: field.description().value(),
            };
            const credential = await firstValueFrom(this.client.createCredential(this.username(), request));
            const ref = await this.dialog.show(credential, UserCredentialCreateTemplate.Generic);
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
