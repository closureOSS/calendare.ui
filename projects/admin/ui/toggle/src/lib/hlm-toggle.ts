import { Directive, input } from '@angular/core';
import { BrnToggle } from '@spartan-ng/brain/toggle';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const toggleVariants = cva(
  "hover:text-foreground aria-pressed:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 data-[matches-spartan-invalid=true]:ring-destructive/20 dark:data-[matches-spartan-invalid=true]:ring-destructive/40 data-[matches-spartan-invalid=true]:border-destructive dark:data-[matches-spartan-invalid=true]:border-destructive/50 gap-1 rounded-md text-sm font-medium transition-[color,box-shadow] [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(4)] group/toggle hover:bg-muted inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-input hover:bg-muted border bg-transparent shadow-xs',
        emphasis: 'border data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground',
      },
      size: {
        default: "h-11 min-w-11 px-2.5 [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(7)]",
        sm: 'h-9 min-w-9 px-2.5',
        lg: "h-13 min-w-13 px-2.5 [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(10)]",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
export type ToggleVariants = VariantProps<typeof toggleVariants>;

@Directive({
  selector: 'button[hlmToggle]',
  hostDirectives: [
    {
      directive: BrnToggle,
      inputs: ['id', 'value', 'disabled', 'state', 'aria-label', 'type'],
      outputs: ['stateChange'],
    },
  ],
  host: {
    'data-slot': 'toggle',
  },
})
export class HlmToggle {
  public readonly variant = input<ToggleVariants['variant']>('default');
  public readonly size = input<ToggleVariants['size']>('default');
  constructor() {
    classes(() =>
      toggleVariants({
        variant: this.variant(),
        size: this.size(),
      }),
    );
  }
}
