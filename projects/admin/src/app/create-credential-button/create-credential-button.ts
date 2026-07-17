import { booleanAttribute, Component, input, output } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cal-create-credential-button',
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
  templateUrl: './create-credential-button.html',
  styleUrl: './create-credential-button.scss',
})
export class CreateCredentialButton {
  public username = input.required<string>();
  public email = input<string | null | undefined>(null);
  public mini = input(false, { transform: booleanAttribute });
  public disabled = input(false, { transform: booleanAttribute });
}
