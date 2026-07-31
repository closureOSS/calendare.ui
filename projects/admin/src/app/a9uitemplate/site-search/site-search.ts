import { Component, inject, input, resource, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SiteSearchProvider, SiteSearchResult } from './site-search-provider';
import { HlmAutocompleteImports } from '@spartan-ng/helm/autocomplete';
import { NgIcon } from '@ng-icons/core';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'a9-site-search',
  imports: [
    HlmAutocompleteImports,
    NgIcon,
    HlmSpinnerImports,
    TranslocoDirective,
  ],
  templateUrl: './site-search.html',
})
export class SiteSearch {
  public placeholder = input<string>('');
  protected searchProvider = inject(SiteSearchProvider);

  public readonly search = signal('');
  public value = signal<SiteSearchResult | null>(null);

  public itemToString = (item: SiteSearchResult) => item.label;

  public hits = resource({
    defaultValue: [],
    params: () => ({ search: this.search() }),
    loader: async ({ params }) => {
      const search = params.search;

      if (search.length === 0) {
        return [] as SiteSearchResult[];
      }
      return await this.searchProvider.searchSite(search);
    },
  });

  private router = inject(Router);
  public selectSearch(menu: SiteSearchResult | null | undefined) {
    setTimeout(() => {
      this.search.set('');
      this.value.set(null);
    });
    if (menu && menu.path) {
      this.router.navigate(menu.path);
    }
  }
}
