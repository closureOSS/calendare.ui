import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { IconPrincipalType } from '../widgets/icon-principal-type/icon-principal-type';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { hasPermission } from '../core/has-permissions';
import { ListPermissions } from '../widgets/list-permissions/list-permissions';
import { PrivilegeMaskConstant } from '../core/privilege-mask';
import { PrincipalResponse, PrivilegeMask } from '../../api/models';
import { CalendareService } from '../../api';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogProvider } from '../a9uitemplate/dialog-confirm/confirm-dialog-provider';
import { ColorSwatch } from "../widgets/color-swatch/color-swatch";
import { ActionBar } from "../a9uitemplate/action-bar/action-bar";

@Component({
  selector: 'cal-view-principal',
  imports: [
    IconPrincipalType,
    ListPermissions,
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    TranslocoDirective,
    ColorSwatch,
    ActionBar
  ],
  templateUrl: './view-principal.html',
  styleUrl: './view-principal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPrincipal {
  public principal = input.required<PrincipalResponse>();
  private readonly client = inject(CalendareService);
  private readonly confirmDialog = inject(ConfirmDialogProvider);
  private readonly router = inject(Router);
  readonly PrivilegeMask = PrivilegeMaskConstant;
  private readonly transloco = inject(TranslocoService);


  public async delete() {
    if (!this.principal() || !this.principal().username) {
      return;
    }
    const answer = await this.confirmDialog.ask({
      title: this.transloco.translate('Delete *principal', { principal: this.principal().displayName }),
      intro: this.transloco.translate('Deleting principal is irreversible'),
      question: this.transloco.translate('Are you sure?')
    });
    if (answer !== true) {
      return;
    }

    try {
      await firstValueFrom(this.client.deleteUser(this.principal().username!));
      await this.router.navigate(['/start']);
    }
    catch (error) {
      console.log(error);
      if (error !== undefined) {
        const pd = error as HttpErrorResponse;
        if (pd) {
          console.log(pd);
          switch (pd.status) {
            case HttpStatusCode.Forbidden:
              break;

            case HttpStatusCode.NotFound:
              // already deleted
              break;

            default:
              // this.errorDialog.show({ body: 'Connection to server failed. Retry later.' });
              break;
          }
        } else {
          // this.errorDialog.show({ body: 'Connection to server failed. Retry later.' });
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  }

  public hasPermission(permissions: PrivilegeMask | undefined | null, required: PrivilegeMask | PrivilegeMaskConstant): boolean {
    return hasPermission(permissions, required);
  }
}
