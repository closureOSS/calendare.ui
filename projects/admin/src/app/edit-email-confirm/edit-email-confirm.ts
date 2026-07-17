import { Component, inject, input, output, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { PrincipalResponse, CalendareService } from '../../api';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { FormSignalError } from '../a9uitemplate/form-signal-error';

export interface EmailConfirmFormData {
  confirmationToken: string;
}

@Component({
  selector: 'cal-edit-email-confirm',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    FormSignalError,
    MatInputModule,
    ActionBar,
    HintBox,
    FormField,
    FormRoot,
    TranslocoDirective,
  ],
  templateUrl: './edit-email-confirm.html',
  styleUrl: './edit-email-confirm.scss',

})
export class EditEmailConfirm {
  public principal = input.required<PrincipalResponse>();
  private readonly client = inject(CalendareService);
  public confirmed = output<boolean>();


  transloco = inject(TranslocoService);

  protected readonly formModel = signal<EmailConfirmFormData>({
    confirmationToken: '',
  });
  readonly editForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.confirmationToken, { message: this.transloco.translate('Confirmation code is required') });
  },
    {
      submission: {
        action: async (field) => {
          try {
            await firstValueFrom(this.client.confirmUserEmail(this.principal().username!, { confirmationToken: field.confirmationToken().value() }));
            field().reset();
            this.confirmed.emit(true);
            return;
          }
          catch (e) {
            const pd = e as HttpErrorResponse;
            if (pd) {
              console.error('Error %d: %o', pd.status, pd);
              if (pd.status === HttpStatusCode.UnprocessableEntity) {
                return { kind: 'serverError', message: this.transloco.translate('Invalid email confirmation code') };
              }
              return { kind: 'serverError', message: pd.message ?? this.transloco.translate('Saving changes failed') };
            } else {
              console.error('Unknown error while amending collection: %o', e);
              return { kind: 'serverError', message: this.transloco.translate('Saving changes failed (reason unknown)') };
            }
          }
        },
        onInvalid: (field) => {
          const firstError = field().errorSummary()[0];
          firstError?.fieldTree().focusBoundControl();
        },
      }
    });

  public async resend() {
    try {
      await firstValueFrom(this.client.sendEmailConfirmationCode(this.principal().username!));
    }
    catch (e) {
      this.confirmed.emit(false);
      const pd = e as HttpErrorResponse;
      if (pd) {
        console.error('Error %d: %s %s %o', pd.status, pd.error['detail'], pd.error['title'], pd);
        // this.formMessage.set(this.transloco.translate('Saving changes failed'));
      } else {
        console.error('Unknown error while amending collection: %o', e);
        //this.formMessage.set(this.transloco.translate('Saving changes failed (reason unknown)'));
      }
    }
  }
}
