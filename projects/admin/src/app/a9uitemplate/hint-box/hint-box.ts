import { booleanAttribute, Component, computed, input } from '@angular/core';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDangerousOutline, matEmergencyHomeOutline, matLightbulbOutline } from '@ng-icons/material-symbols/outline';
import { lucideLoaderPinwheel } from '@ng-icons/lucide';
import { HlmProgressImports } from '@spartan-ng/helm/progress';

@Component({
  selector: 'a9-hint-box',
  imports: [
    HlmSpinnerImports,
    HlmAlertImports,
    HlmProgressImports,
    NgIcon,
  ],
  providers: [
    provideIcons({
      matDangerousOutline,
      matEmergencyHomeOutline,
      matLightbulbOutline,
      lucideLoaderPinwheel,
    }),
  ],
  host: {
    'class': 'block my-1 max-w-2xl'
  },
  templateUrl: './hint-box.html',
})
export class HintBox {
  mode = input<'info' | 'warning' | 'error'>('info');
  spinner = input<boolean>(false, { transform: booleanAttribute })

  variant = computed(() => {
    return this.mode() === 'error' ? 'destructive' : 'default';
  });

  boxClass = computed(() => {
    switch (this.mode()) {
      case 'error': return 'bg-destructive text-destructive-foreground';
      case 'warning': return 'text-secondary bg-secondary-foreground';
      // case 'warning': return 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50';
      case 'info':
      default:
        return '';
    }
  });

  bodyClass = computed(() => {
    switch (this.mode()) {
      case 'error': return 'text-destructive-foreground';
      case 'warning': return 'text-secondary-foreground';
      case 'info':
      default:
        return '';
    }
  });

  public svgIcon(): string {
    switch (this.mode()) {
      case 'error': return 'matDangerousOutline';
      case 'warning': return 'matEmergencyHomeOutline'
      case 'info':
      default:
        return 'matLightbulbOutline';
    }
  }
}
