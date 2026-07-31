import { Component, input } from '@angular/core';
import { ReadonlyFieldState } from '@angular/forms/signals';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
  selector: 'a9-field-error',
  imports: [
    HlmFieldImports,
  ],
  templateUrl: './field-error.html',
})
export class FieldError<TValue = unknown> {
  public field = input.required<ReadonlyFieldState<TValue>>();
}
