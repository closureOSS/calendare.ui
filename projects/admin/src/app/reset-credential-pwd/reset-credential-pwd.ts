import { Component, inject, input, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { CalendareService } from '../../api/services';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { UserCredentialCreateTemplate, UserCredentialResetRequest } from '../../api/models';
import { httpErrorToProblemDetails } from '../core/http-error-helper';
import { ResetCredentialPwdFormData } from './reset-credential-pwd-form.interface';
import { passwordConfig } from '../widgets/form-username-config';
import { FormError } from '../a9uitemplate/form-error/form-error';
import { FieldError } from '../a9uitemplate/field-error/field-error';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { CredentialDialogProvider } from '../dialog-credential-created/credential-dialog-provider';

@Component({
  selector: 'cal-reset-credential-pwd',
  imports: [
    FormField,
    FormRoot,
    HlmCardImports,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmInputImports,
    HlmFieldImports,
    NavigateBackButton,
    FormError,
    FieldError,
    TranslocoDirective
  ],
  providers: [
    CredentialDialogProvider,
  ],
  templateUrl: './reset-credential-pwd.html',
})
export class ResetCredentialPwd {
  public username = input.required<string>();
  public accesskey = input.required<string>();
  transloco = inject(TranslocoService);
  readonly dialog = inject(CredentialDialogProvider);

  private readonly client = inject(CalendareService);
  protected readonly formModel = signal<ResetCredentialPwdFormData>({
    password: '',
    passwordConfirm: '',
    description: ''
  });

  readonly editForm = form(this.formModel, (schemaPath) => {
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
            const password = field.password().value();
            const request: UserCredentialResetRequest | undefined = password !== '' ? { password: field.password().value(), } : undefined;
            const credential = await firstValueFrom(this.client.setCredentialPassword(this.username(), this.accesskey(), request, undefined));
            const ref = await this.dialog.show(credential, UserCredentialCreateTemplate.Generic);
            field().reset();
            this.back();
            return;
          }
          catch (e) {
            const pd = httpErrorToProblemDetails(e);
            console.error('Error changing password of credential %s/%s: %o', this.username(), this.accesskey(), pd);
            switch (pd.status) {
              default:
                return { kind: 'serverError', message: `${this.transloco.translate('Password not changed')} ${this.transloco.translate(pd.title ?? '')}` };
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
