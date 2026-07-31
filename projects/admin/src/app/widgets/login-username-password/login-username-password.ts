import { booleanAttribute, Component, inject, input, model, output, signal } from '@angular/core';
import { LoginCredentialsFormData } from './login-credentials-form-data';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { passwordConfig, usernameConfig } from '../form-username-config';
import { FormError } from '../../a9uitemplate/form-error/form-error';
import { FieldError } from '../../a9uitemplate/field-error/field-error';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matRestartAltOutline } from '@ng-icons/material-symbols/outline';

@Component({
  selector: 'cal-login-username-password',
  imports: [
    FormField,
    FormRoot,
    HlmButtonGroupImports,
    HlmButtonImports,
    HlmLabelImports,
    HlmFieldImports,
    HlmInputImports,
    NgIcon,
    FormError,
    FieldError,
    TranslocoDirective,
  ],
  providers: [
    provideIcons({ matRestartAltOutline, }),
  ],
  templateUrl: './login-username-password.html',
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

