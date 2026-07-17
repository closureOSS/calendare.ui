import { booleanAttribute, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'a9-hint-box',
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  host: {
    'class': 'a9-hint-box'
  },
  templateUrl: './hint-box.html',
  styleUrl: './hint-box.scss',
})
export class HintBox {
  mode = input<'info' | 'warning' | 'error'>('info');
  slim = input<boolean>(false, { transform: booleanAttribute });
  spinner = input<boolean>(false, { transform: booleanAttribute })

  public svgIcon(): string {
    switch (this.mode()) {
      case 'error': return 'dangerous#hint';
      case 'warning': return 'emergency_home#hint'
      case 'info':
      default:
        return 'lightbulb#hint';
    }
  }
}
