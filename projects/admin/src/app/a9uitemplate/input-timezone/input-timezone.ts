import { Component, computed, input, linkedSignal, model, output } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { HlmAutocompleteImports } from '@spartan-ng/helm/autocomplete';

@Component({
  selector: 'a9-input-timezone',
  imports: [
    HlmAutocompleteImports,
  ],
  templateUrl: './input-timezone.html',
})
export class InputTimezone implements FormValueControl<string | null> {
  private static _id = 0;
  public readonly value = model<string | null>(null);
  public placeholder = input<string | null>(null);
  public empty = input<string | null>(null);
  public readonly touch = output<void>();
  public readonly disabled = input<boolean>(false);
  public readonly readonly = input<boolean>(false);
  public readonly inputId = input<string>(`input-timezone-${InputTimezone._id++}`);

  public search = linkedSignal({
    source: () => this.value(),
    computation: (item) => item ?? '',
  });

  public readonly filteredOptions = computed(() =>
    Intl.supportedValuesOf('timeZone').filter((tz) => tz.toLowerCase().includes(this.search().toLowerCase())),
  );

  public updateValue(value: string | null | undefined): void {
    this.value.set(value ?? null);
  }
}
