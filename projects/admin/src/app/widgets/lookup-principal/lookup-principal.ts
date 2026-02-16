import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { CalendareService, PrincipalResponse } from '../../../api';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'cal-lookup-principal',
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './lookup-principal.html',
  styleUrl: './lookup-principal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LookupPrincipal {
  public label = input<string>('Lookup principal');
  public initialValue = input<string>('');
  public principal = output<PrincipalResponse>();

  lookupForm: FormGroup = new FormGroup({
    searchTerm: new FormControl<string>(this.initialValue())
  });

  private readonly calendareService = inject(CalendareService);

  public principalQuery = this.lookupForm.get('searchTerm')?.valueChanges.pipe(
    // tap(x => console.log('Searching ', x)),
    debounceTime(250),
    filter(x => typeof x !== 'object'),
    distinctUntilChanged(),
    map(search => {
      // console.log('CONTENT[%s]/%s', search, typeof search);
      return search as string;
    }),
    switchMap(search => {
      // console.log('CONTENT[%s]/%s,%d', search, typeof search, search.length);
      if (search.length < 1) return of([]);
      return this.calendareService.getUserList(['*'], search, true, false);
    })
  );

  displayFn(_principal: PrincipalResponse): string { return ''; }

  choose(event: MatAutocompleteSelectedEvent) {
    const principal = event.option.value as PrincipalResponse;
    // console.log('Choose -> ', principal);
    if (principal) {
      this.principal.emit(principal);
    }
  }
}
