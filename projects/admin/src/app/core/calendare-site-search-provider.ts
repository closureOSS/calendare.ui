import { inject, Service } from "@angular/core";
import { SiteSearchProvider, SiteSearchResult } from "../a9uitemplate/site-search/site-search-provider";
import { SiteMenuProvider } from "../a9uitemplate/site-menu/site-menu-provider";
import { CalendareService } from "../../api";
import { firstValueFrom } from "rxjs";
import { principalIcon } from "../widgets/icon-principal-type/icon-principal-type";

@Service()
export class CalendareSiteSearchProvider extends SiteSearchProvider {

  constructor() {
    super();
  }

  private menu = inject(SiteMenuProvider);
  public override async searchSite(query: string): Promise<SiteSearchResult[]> {
    // console.log('Searching for %s', query);
    const menuResults: SiteSearchResult[] = [];
    const menus = this.menu.menuConfig();
    if (menus && menus.length > 0) {
      for (const mi of menus) {
        if (mi.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          || mi.desc?.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
          menuResults.push(mi);
        }
      }
    }
    const principalResults = await this.searchPrincipals(query);
    return [
      ...menuResults,
      ...principalResults,
    ];
  }

  private readonly calendareService = inject(CalendareService);
  private async searchPrincipals(query: string): Promise<SiteSearchResult[]> {
    const results: SiteSearchResult[] = [];
    try {
      const hits = await firstValueFrom(this.calendareService.getUserList(['INDIVIDUAL', 'ROOM', 'RESOURCE', 'GROUP'], query, true, false));
      // console.log('Principal (%s) -> %o', query, hits);
      if (hits && hits.length !== 0) {
        for (const principal of hits) {
          results.push({
            label: principal.displayName ?? '',
            desc: principal.uri,
            path: ['/', 'principal', 'show', principal.username ?? ''],
            icon: principalIcon(principal.principalType?.label),
          });
        }

      }
    }
    catch {
// TODO
    }
    return results;
  }
}
