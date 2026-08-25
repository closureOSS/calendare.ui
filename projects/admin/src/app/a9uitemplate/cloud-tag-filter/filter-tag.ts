export class FilterValue {
  selected: boolean = false;
  cnt: number = 1;
  filterCnt: number = 1;

  constructor(public value: string) {
  }
}

export interface CloudTagValue {
  name: string;
  value: string;
}

export class FilterTag {
  key: string;
  values: FilterValue[] = [];
  includeNull = false;

  cnt: number = 0;
  filterCnt: number = 0;
  nullCnt: number = 0;

  get score() {
    return this.values.length / this.cnt;
  }

  get isFiltering() {
    return this.values.find(z => z.selected === true) || this.includeNull === true;
  }

  constructor(key: string, value: string | null = null) {
    this.key = key;
    if (value) {
      this.values.push(new FilterValue(value));
    }
    this.cnt = 1;
  }
}

export interface FilterByTag {
  key: string;
  values: string[];
}
