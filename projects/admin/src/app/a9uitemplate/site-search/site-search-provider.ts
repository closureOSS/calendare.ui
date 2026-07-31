import { Injectable } from "@angular/core";

export interface SiteSearchResult {
  label: string;
  path: string[];
  desc?: string | null;
  icon?: string | null;
}

@Injectable()
export class SiteSearchProvider {

  public async searchSite(query: string): Promise<SiteSearchResult[]> {
    return [];
  }
}
