import { booleanAttribute, Component, computed, input } from '@angular/core';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDangerousFillOutline, matDangerousOutline, matEmergencyFillOutline, matEmergencyHomeFillOutline, matEmergencyHomeOutline, matInfoFillOutline, matInfoOutline, matLightbulbFillOutline, matLightbulbOutline } from '@ng-icons/material-symbols/outline';
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
      matDangerousOutline, matDangerousFillOutline,
      matEmergencyHomeOutline, matEmergencyHomeFillOutline,
      matLightbulbOutline, matLightbulbFillOutline,
      matInfoOutline, matInfoFillOutline,
      lucideLoaderPinwheel,
    }),
  ],
  host: {
    'class': 'block my-1 max-w-2xl'
  },
  templateUrl: './hint-box.html',
})
export class HintBox {
  mode = input<'info' | 'hint' | 'warning' | 'error'>('info');
  spinner = input<boolean>(false, { transform: booleanAttribute })
  compact = input<boolean>(false, { transform: booleanAttribute })

  variant = computed(() => {
    return this.mode() === 'error' ? 'destructive' : 'default';
  });

  boxClass = computed(() => {
    const align = this.compact() ? 'flex flex-row items-center' : '';
    switch (this.mode()) {
      case 'error': return `${align} bg-destructive text-destructive-foreground`;
      case 'warning': return `${align} text-secondary bg-secondary-foreground`;
      // case 'warning': return 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50';
      case 'hint':
      case 'info':
      default:
        return `${align} text-primary`;
    }
  });

  bodyClass = computed(() => {
    switch (this.mode()) {
      case 'error': return 'text-destructive-foreground';
      case 'warning': return 'text-secondary';
      case 'hint':
      case 'info':
      default:
        return 'text-secondary-foreground';
    }
  });

  public svgIcon(): string {
    switch (this.mode()) {
      case 'error': return 'matDangerousFillOutline';
      case 'warning': return 'matEmergencyHomeFillOutline'
      case 'hint': return 'matLightbulbOutline';
      case 'info':
      default:
        return 'matInfoOutline';
    }
  }
}
