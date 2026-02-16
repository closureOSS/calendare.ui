import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { PrincipalResponse, CalendareService } from '../../api';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActionBar } from '../a9uitemplate/action-bar/action-bar';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HintBox } from '../a9uitemplate/hint-box/hint-box';

@Component({
  selector: 'cal-edit-email-confirm',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ActionBar,
    HintBox,
    ReactiveFormsModule,
    TranslocoDirective,
  ],
  templateUrl: './edit-email-confirm.html',
  styleUrl: './edit-email-confirm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmailConfirm {
  public principal = input.required<PrincipalResponse>();
  private readonly client = inject(CalendareService);
  public confirmed = output<boolean>();

  protected confirmationToken = new FormControl('', [Validators.required]);
  public formMessage = signal<string | null>(null);

  transloco = inject(TranslocoService);
  public async submitForm() {
    console.log('Form valid %s -> %o', this.confirmationToken.valid, this.confirmationToken.value);
    if (!this.confirmationToken.valid) {
      this.formMessage.set(this.transloco.translate('Data is invalid, please correct input first'));
      return;
    }
    try {
      await firstValueFrom(this.client.confirmUserEmail(this.principal().username!, { confirmationToken: this.confirmationToken.value }));
      this.confirmed.emit(true);
    }
    catch (e) {
      this.confirmed.emit(false);
      const pd = e as HttpErrorResponse;
      if (pd) {
        if (pd.status === HttpStatusCode.UnprocessableEntity) {
          this.formMessage.set(this.transloco.translate('Invalid email confirmation code'));
        } else {
          console.error('Error %d: %s %s %o', pd.status, pd.error['detail'], pd.error['title'], pd);
          this.formMessage.set(this.transloco.translate('Saving changes failed'));
        }
      } else {
        console.error('Unknown error while amending collection: %o', e);
        this.formMessage.set(this.transloco.translate('Saving changes failed (reason unknown)'));
      }
    }
  }

  public async resend() {
    try {
      await firstValueFrom(this.client.sendEmailConfirmationCode(this.principal().username!));
    }
    catch (e) {
      this.confirmed.emit(false);
      const pd = e as HttpErrorResponse;
      if (pd) {
        if (pd.status === HttpStatusCode.UnprocessableEntity) {
          this.formMessage.set(this.transloco.translate('Invalid email confirmation code'));
        } else {
          console.error('Error %d: %s %s %o', pd.status, pd.error['detail'], pd.error['title'], pd);
          this.formMessage.set(this.transloco.translate('Saving changes failed'));
        }
      } else {
        console.error('Unknown error while amending collection: %o', e);
        this.formMessage.set(this.transloco.translate('Saving changes failed (reason unknown)'));
      }
    }
  }
}
