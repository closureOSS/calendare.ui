import { booleanAttribute, Component, inject, input, model, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginCredentialsFormData } from './login-credentials-form-data';
import { ActionBar } from '../../a9uitemplate/action-bar/action-bar';
import { HintBox } from '../../a9uitemplate/hint-box/hint-box';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { form, FormField, FormRoot, maxLength, minLength, pattern, required, SchemaPath } from '@angular/forms/signals';
import { FormSignalError } from '../../a9uitemplate/form-signal-error';
import { passwordConfig, usernameConfig } from '../form-username-config';

@Component({
  selector: 'cal-login-username-password',
  imports: [
    MatButtonModule,
    MatIconModule,
    FormField,
    FormRoot,
    MatFormFieldModule,
    FormSignalError,
    MatInputModule,
    HintBox,
    ActionBar,
    TranslocoDirective,
  ],
  templateUrl: './login-username-password.html',
  styleUrl: './login-username-password.scss',

})
export class LoginUsernamePassword {
  public hasReset = input(false, { transform: booleanAttribute });
  public loginLabel = input<string | null>(null);
  transloco = inject(TranslocoService);
  public formMessage = model<string | null>(null);

  public login = output<LoginCredentialsFormData>();
  protected readonly formModel = signal<LoginCredentialsFormData>({
    username: '',
    password: '',
  });

  readonly editForm = form(this.formModel, (schemaPath) => {
    usernameConfig(schemaPath.username, this.transloco);
    passwordConfig(schemaPath.password, this.transloco);
    required(schemaPath.password, { message: this.transloco.translate('Password is required') });
  }, {
    submission: {
      action: async (field) => {
        this.login.emit(field().value());
      },
      onInvalid: (field) => {
        const firstError = field().errorSummary()[0];
        firstError?.fieldTree().focusBoundControl();
      },
    }
  });
}

