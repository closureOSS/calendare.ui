import { Component, input, model } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { FilterByTag, FilterTag } from './filter-tag';
import { TranslocoDirective } from '@jsverse/transloco';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'a9-cloud-tag-filter',
  imports: [
    HlmButtonImports,
    HlmDropdownMenuImports,
    TranslocoDirective,
  ],
  host: {
    class: 'block',
  },
  templateUrl: './cloud-tag-filter.html',
})
export class CloudTagFilter implements FormValueControl<FilterByTag[]> {
  tagCloud = input.required<FilterTag[]>();

  value = model([] as FilterByTag[]);
  disabled = input<boolean>(false);

  protected tagFilter(key: string, val: string) {
    let currentTags = this.value();
    let hitTag = currentTags.find(ct => ct.key === key);
    if (!hitTag) {
      hitTag = { key: key, values: [] } as FilterByTag;
      currentTags.push(hitTag);
    }
    hitTag.values = hitTag.values.includes(val)
      ? hitTag.values.filter(v => v !== val)
      : [...hitTag.values, val];
    if (hitTag.values.length === 0) {
      currentTags = currentTags.filter(ct => ct.key !== key);
    }
    if (currentTags.length !== 0) {
      this.value.set([...currentTags]);
    }
    else {
      this.value.set([]);
    }

    // console.log('tagFilter %s:%s -> %o %o', key, val, currentTags, this.searchForm.filterByTag().value());
  }
}
