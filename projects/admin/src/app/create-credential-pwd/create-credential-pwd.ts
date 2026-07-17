import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LocationStrategy } from '@angular/common';
import { CalendareService } from '../../api/services';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';
import { MatCardModule } from '@angular/material/card';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { MatIconModule } from '@angular/material/icon';
import { disabled, email, form, FormField, FormRoot, maxLength, minLength, pattern, required, validate } from '@angular/forms/signals';
import { UserCredentialCreateRequest, UserCredentialCreateTemplate } from '../../api/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogCredentialCreated } from '../dialog-credential-created/dialog-credential-created';
import { httpErrorToProblemDetails } from '../core/http-error-helper';
import { CreateCredentialPwdFormData } from './create-credential-pwd-form.interface';
import { FormSignalError } from '../a9uitemplate/form-signal-error';
import { passwordConfig, usernameConfig } from '../widgets/form-username-config';

@Component({
  selector: 'cal-create-credential-pwd',
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
  templateUrl: './create-credential-pwd.html',
  styleUrl: './create-credential-pwd.scss',
})
export class CreateCredentialPwd {
  public username = input.required<string>();
  public accesskey = input<string>('');
  transloco = inject(TranslocoService);
  readonly dialog = inject(MatDialog);

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
