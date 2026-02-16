import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'a9-hint-box',
  imports: [
    MatIconModule,
  ],
  host: {
    'class': 'a9-hint-box'
  },
  templateUrl: './hint-box.html',
  styleUrl: './hint-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HintBox {
  mode = input<'info' | 'warning' | 'error'>('info');
  slim = input<boolean>(false);

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
