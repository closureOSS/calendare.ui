import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { CalendareService } from '../../api/services';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { MatCardModule } from '@angular/material/card';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { MatIconModule } from '@angular/material/icon';
import { form, FormField, FormRoot, maxLength, pattern, required, validate } from '@angular/forms/signals';
import { UserCredentialCreateTemplate, UserCredentialResetRequest } from '../../api/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogCredentialCreated } from '../dialog-credential-created/dialog-credential-created';
import { httpErrorToProblemDetails } from '../core/http-error-helper';
import { ResetCredentialPwdFormData } from './reset-credential-pwd-form.interface';
import { FormSignalError } from '../a9uitemplate/form-signal-error';
import { passwordConfig } from '../widgets/form-username-config';

@Component({
  selector: 'cal-reset-credential-pwd',
  imports: [
    MatButtonModule,
    FormField,
    FormRoot,
    MatCardModule,
    MatFormFieldModule,
    FormSignalError,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    NavigateBackButton,
    HintBox,
    ActionBar,
    TranslocoDirective
  ],
  templateUrl: './reset-credential-pwd.html',
  styleUrl: './reset-credential-pwd.scss',
})
export class ResetCredentialPwd {
  public username = input.required<string>();
  public accesskey = input.required<string>();
  transloco = inject(TranslocoService);
  readonly dialog = inject(MatDialog);

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
            const ref = this.dialog.open(DialogCredentialCreated, {
              data: {
                credential: credential,
                template: UserCredentialCreateTemplate.Generic,
              },
              width: '90%',
              maxWidth: '980px'
            });
            const _answer = await firstValueFrom(ref.afterClosed());
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
