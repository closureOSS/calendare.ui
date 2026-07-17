import { Component, inject, input, signal } from '@angular/core';
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
import { form, FormField, FormRoot, max, min, minLength, required } from '@angular/forms/signals';
import { CreateCredentialFormData } from './create-credential-form.interface';
import { MatRadioModule } from '@angular/material/radio';
import { UserCredentialCreateRequest, UserCredentialCreateTemplate } from '../../api/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogCredentialCreated } from '../dialog-credential-created/dialog-credential-created';
import { httpErrorToProblemDetails } from '../core/http-error-helper';
import { FormSignalError } from '../a9uitemplate/form-signal-error';


@Component({
  selector: 'cal-create-credential',
  imports: [
    MatButtonModule,
    FormField,
    FormRoot,
    MatCardModule,
    MatFormFieldModule,
    FormSignalError,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    NavigateBackButton,
    HintBox,
    ActionBar,
    TranslocoDirective
  ],
  templateUrl: './create-credential.html',
  styleUrl: './create-credential.scss',
})
export class CreateCredential {
  public username = input.required<string>();
  transloco = inject(TranslocoService);
  readonly dialog = inject(MatDialog);

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
            const ref = this.dialog.open(DialogCredentialCreated, {
              data: {
                credential: credential,
                template: UserCredentialCreateTemplate.ApplicationKey,
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
