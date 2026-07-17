import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { ReadonlyFieldState } from '@angular/forms/signals';


@Directive({
  selector: 'mat-error[field]',
})
export class FormSignalError<T> {
  field = input.required<ReadonlyFieldState<T>>();
  private el = inject(ElementRef<HTMLElement>);

  _writeError = effect(() => {
    const field = this.field();
    const errors = field.errors();
    const firstError = errors?.[0];
    if (firstError) {
      this.el.nativeElement.textContent = firstError.message || firstError.kind || '';
      this.el.nativeElement.style.display = 'block';
    } else {
      this.el.nativeElement.style.display = 'none';
      this.el.nativeElement.textContent = '';
    }
  });
}
