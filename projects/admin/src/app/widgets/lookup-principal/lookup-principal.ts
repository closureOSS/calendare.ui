import { Component, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import { PrincipalResponse } from '../../../api';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmAutocompleteImports } from '@spartan-ng/helm/autocomplete';
import { CalendareResource } from '../../../api/resources';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'cal-lookup-principal',
  imports: [
    TranslocoDirective,
    HlmFieldImports,
    HlmAutocompleteImports,
    HlmSpinnerImports,
  ],
  templateUrl: './lookup-principal.html',
})
export class LookupPrincipal {
  public label = input<string>('Lookup principal');
  public principal = output<PrincipalResponse>();
  public initialValue = input<string>('');

  public search = linkedSignal(() => this.initialValue());

  constructor() {
    effect(() => {
      if (this.selected() !== null) {
        this.principal.emit(this.selected()!);
        this.search.set('');
      }
    });
  }

  public selected = signal<PrincipalResponse | null>(null);

  public itemToString = (item: PrincipalResponse) => item?.displayName ?? '';
  private readonly calendareResource = inject(CalendareResource);
  public options = this.calendareResource.getUserList(['*'], this.search, true, false);
}
