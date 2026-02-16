import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoDirective } from '@jsverse/transloco';
import { PermissionResponse } from '../../api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cal-create-principal-button',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TranslocoDirective,
  ],
  host: {
    '[class.mini]': 'mini()'
  },
  templateUrl: './create-principal-button.html',
  styleUrl: './create-principal-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePrincipalButton {
  public permissions = input.required<PermissionResponse | undefined>();

  public mini = input(false, { transform: booleanAttribute });

}
