import { Component } from '@angular/core';

@Component({
  selector: 'a9-label-value-item',
  imports: [],
  templateUrl: './label-value-item.html',
  host: {
    'class': 'items-baseline grid grid-cols-1 @lg:grid-cols-[clamp(6rem,33.333%,12rem)_1fr] gap-1 @lg:gap-2',
  },
})
export class LabelValueItem { }
