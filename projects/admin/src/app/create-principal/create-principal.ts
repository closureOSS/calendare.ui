import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormPrincipalCreate } from '../form-principal-create/form-principal-create';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormPrincipalCreateData } from '../form-principal-create/form-principal-create.data';
import { CalendareService } from '../../api/services';
import { firstValueFrom } from 'rxjs';
import { ErrorDialogProvider } from '../a9uitemplate/dialog-error/error-dialog-provider';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { NavigateBackButton } from '../a9uitemplate/navigate-back-button/navigate-back-button';

@Component({
  selector: 'cal-create-principal',
  imports: [
    FormPrincipalCreate,
    NavigateBackButton,
    TranslocoDirective,
  ],
  templateUrl: './create-principal.html',
  styleUrl: './create-principal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePrincipal {
  principalTypeLabel = input.required<string>();
  private readonly router = inject(Router);
  private errorDialog = inject(ErrorDialogProvider);
  public formMessage = signal<string | null>(null);

  private readonly client = inject(CalendareService);
  private readonly transloco = inject(TranslocoService);

  public async create(data: FormPrincipalCreateData) {
    console.log('Create principal %s -> %o', this.principalTypeLabel(), data);
    try {
      await firstValueFrom(this.client.createUser({ ...data, type: this.principalTypeLabel() }));
      this.router.navigate(['/principal', 'show', data.username]);
    } catch (error) {
      if (error !== undefined) {
        const pd = error as HttpErrorResponse;
        if (pd) {
          switch (pd.status) {
            // case HttpStatusCode.Created:
            // case HttpStatusCode.NoContent:
            //   this.router.navigate(['/']);
            //   break;

            case HttpStatusCode.BadRequest:
              this.formMessage.set(this.transloco.translate('Creating account failed, please check your input and retry.'));
              break;

            case HttpStatusCode.Conflict:
              this.formMessage.set(this.transloco.translate('Username is already in use. Please change username.'));
              // this.errorDialog.show({ body: 'Username is already in use. Please change username.' });
              break;

            case HttpStatusCode.Unauthorized:
              this.router.navigate(['/login']);
              break;

            default:
              this.errorDialog.show({ body: this.transloco.translate('Connection to server failed. Retry later.') });
              break;
          }
        } else {
          this.errorDialog.show({ body: this.transloco.translate('Connection to server failed. Retry later.') });
        }
      } else {
        console.error(error);
      }
    }
  }
}
