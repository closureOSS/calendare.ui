import { CloudTagValue, FilterByTag, FilterTag, FilterValue } from "./filter-tag";


export class FilterList<FilterRecord> {

  constructor(
    protected getLabels: ((host: FilterRecord) => CloudTagValue[] | undefined | null),
    protected genericFilter: (() => ((host: FilterRecord) => boolean) | null)
  ) { }

  static GenericKey = '**generic**';
  static NullFilter = '***';


  public filter(records: FilterRecord[], filterByTag: FilterByTag[] | undefined) {
    // console.log('Filter %o, %o', filterByTag, searchTerm);
    const tagCloud = this.buildTagCloud(records);
    const genericFilter = this.genericFilter && this.genericFilter();
    if (genericFilter) {
      this.pushSequences([FilterList.GenericKey]);
    } else {
      this.removeSequence(FilterList.GenericKey);
    }
    if (filterByTag && filterByTag.length > 0) {
      const tags = filterByTag?.map(f => f.key);
      this.removeSequences([...tags, FilterList.GenericKey]);
      this.pushSequences(tags);
    } else {
      this.removeSequences([FilterList.GenericKey]);
    }

    let results: FilterRecord[] = [...records];
    for (const key of this.filterSequence) {
      const beforeCnt = results.length;
      if (key === FilterList.GenericKey) {
        results = this.performGenericFilter(results, genericFilter);
      } else {
        const ft = filterByTag?.find(f => f.key === key);
        if (!ft) continue;  // should not happen ...
        const tag = this.updateTagCount(tagCloud, ft.key, results, ft.values);
        if (!tag) continue; // should not happen ...
        results = results.filter(host => this.matchTagValue(tag.key, ft.values, tag.includeNull, host));
      }
      if (beforeCnt !== results.length) {
        // reduction done ...
      }
    }
    for (const tag of tagCloud.filter(tc => !tc.isFiltering)) {
      this.updateTagCount(tagCloud, tag.key, results);
    }
    // console.log('Sequence %o', this.filterSequence);
    // console.log('Filter %o, %o -> %o', filterByTag, searchTerm, tagCloud);
    return {
      data: results,
      tagCloud: tagCloud,
    };
  }

  private performGenericFilter(records: FilterRecord[], genericFilter: ((host: FilterRecord) => boolean) | null) {
    if (genericFilter) {
      records = records.filter(host => genericFilter(host));
    }
    return records;
  }

  private updateTagCount(tagCloud: FilterTag[], key: string, records: FilterRecord[], selected?: string[] | undefined) {
    const tag = tagCloud.find(tc => tc.key === key);
    if (!tag) return;
    tag.nullCnt = 0;
    for (const val of tag.values) {
      val.filterCnt = 0;
      if (selected) {
        val.selected = selected.includes(val.value);
      }
    }
    if (selected) {
      tag.includeNull = selected.includes(FilterList.NullFilter);
    }
    for (const r of records) {
      const hit = this.getLabels(r)?.find(l => l.name === tag.key);
      if (hit) {
        const val = tag.values.find(v => v.value === hit.value);
        if (val) {
          val.filterCnt++;
        }
      } else {
        tag.nullCnt++;
      }
    }
    tag.filterCnt = tag.values.reduce((max, current) => max + current.filterCnt, 0);
    return tag;
  }

  private matchTagValue(tag: string, values: string[], matchNull: boolean, record: FilterRecord): boolean {
    const lbl = this.getLabels(record)?.find(l => l.name === tag);
    if (!lbl || !lbl.value) return matchNull;
    return values.includes(lbl.value);
  }

  private buildTagCloud(records: FilterRecord[]) {
    const cloud: FilterTag[] = [];
    for (const r of records) {
      const labels = this.getLabels(r);
      if (labels) {
        for (const tv of labels) {
          const hit = cloud.find(c => c.key === tv.name);
          if (!hit) {
            cloud.push(new FilterTag(tv.name!, tv.value));
          } else {
            hit.cnt++;
            hit.filterCnt++;
            const valhit = hit.values.find(v => v.value === tv.value);
            if (!valhit) {
              hit.values.push(new FilterValue(tv.value!));
            } else {
              valhit.cnt++;
              valhit.filterCnt++;
            }
          }
        }
      }
    }
    return cloud.filter(c => c.cnt >= 2 && c.cnt > c.values.length).sort((l, r) => l.score - r.score);
  }

  private filterSequence: string[] = [];
  private pushSequences(sequences: string[]) {
    for (const sequence of sequences) {
      if (!this.filterSequence.includes(sequence)) {
        this.filterSequence.push(sequence);
      }
    }
  }
  private removeSequence(sequence: string) {
    if (this.filterSequence.includes(sequence)) {
      this.filterSequence = this.filterSequence.filter(c => c !== sequence);
    }
  }
  private removeSequences(sequences: string[]) {
    this.filterSequence = this.filterSequence.filter(c => sequences.includes(c));
  }
}
