import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageResponsiveness {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private layoutChanges = this.breakpointObserver.observe([
    '(min-width: 40rem)', // sm
    '(min-width: 48rem)', // md
    '(min-width: 64rem)', // lg
    '(min-width: 80rem)', // xl
    '(min-width: 96rem)', // 2xl
  ]).pipe(
    map((result) => {
      const estw = Object.entries(result.breakpoints).filter(x => x[1]).length;
      return PageResponsiveness.layoutSizes[estw];
    }),
  );
  public static layoutSizes = [
    'xs', 'sm', 'md', 'lg', 'xl', '2xl'
  ]

  public screenSize = toSignal(this.layoutChanges, { initialValue: 'xs' });

  public isMobileView = computed(() => {
    if (['xs', 'sm'].includes(this.screenSize())) {
      return true;
    }
    return false;
  });
}
