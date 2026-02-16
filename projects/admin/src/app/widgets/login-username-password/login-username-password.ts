import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, model, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginCredentialsFormData } from './login-credentials-form-data';
import { ActionBar } from '../../a9uitemplate/action-bar/action-bar';
import { HintBox } from '../../a9uitemplate/hint-box/hint-box';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'cal-login-username-password',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HintBox,
    ActionBar,
    TranslocoDirective,
  ],
  templateUrl: './login-username-password.html',
  styleUrl: './login-username-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginUsernamePassword {
  public hasReset = input(false, { transform: booleanAttribute });
  public loginLabel = input<string | null>(null);
  private readonly formBuilder = inject(FormBuilder);
  public form: FormGroup;
  public formMessage = model<string | null>(null);
  public login = output<LoginCredentialsFormData>();


  constructor() {

    this.form = this.formBuilder.group<LoginCredentialsFormData>({
      username: null,
      password: null,
    });
    this.form.get('username')?.addValidators([Validators.required, Validators.minLength(5), Validators.maxLength(48),
    Validators.pattern('[0-9|a-z|.|-|@]*')
    ]);
    // minLength is intentionally not the server side minimum
    this.form.get('password')?.addValidators([Validators.required, Validators.minLength(1), Validators.maxLength(64)]);
  }

  transloco = inject(TranslocoService);
  public submitForm() {
    if (!this.form.valid) {
      this.formMessage.set(this.transloco.translate('Input is not valid, please correct and try again.'));
      return;
    }
    this.formMessage.set(null);
    this.login.emit(this.form.value as LoginCredentialsFormData);
  }
}
