import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PrivilegeMaskConstant } from '../../core/privilege-mask';
import { PrivilegeMask } from '../../../api/models';

@Component({
  selector: 'cal-list-restrictions',
  imports: [],
  templateUrl: './list-restrictions.html',
  styleUrl: './list-restrictions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRestrictions {
  readonly PrivilegeMask = PrivilegeMaskConstant;
  permissions = input.required<PrivilegeMask | null | undefined>();
  filter = input<PrivilegeMask>();
  vertical = input<boolean>(false);

  permissionList = computed(() => {
    let mask = this.permissions();
    const filter = this.filter() ?? PrivilegeMask._0;
    if (!mask) {
      return ['All'];
    }
    // console.log(mask, filter, mask|filter);
    mask = mask | filter;
    if ((mask & PrivilegeMaskConstant.All) === PrivilegeMaskConstant.All) {
      return ['None'];
    }
    const result: string[] = [];
    for (const tl in PrivilegeMask) {
      const value = PrivilegeMask[tl]

      if (typeof value === "string") {
        const val = +tl;
        const isCombined = ((val & (val - 1)) !== 0);
        // console.log(`Value: ${isCombined} ${val} -> ${PrivilegeMask[tl]} ${((mask & val) !== val)}`);
        if (val && !isCombined) {
          if ((mask & val) !== val) {
            result.push(PrivilegeMask[val]);
          }
        }
      }
    }
    if (result.length === 0) {
      result.push('All');
    }
    return result;
  });

  public hasFlag(flag: PrivilegeMask) {
    const permissions = this.permissions();
    if (!permissions) {
      return false;
    }
    return (permissions & flag) === flag;
  }
}
