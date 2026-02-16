import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { PrivilegeMaskConstant } from '../../core/privilege-mask';
import { PrivilegeMask } from '../../../api/models';

@Component({
  selector: 'cal-edit-permissions',
  imports: [],
  templateUrl: './edit-permissions.html',
  styleUrl: './edit-permissions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPermissions {
  readonly PrivilegeMask = PrivilegeMask;
  permissions = model.required<PrivilegeMask | null | undefined>();
  filter = input<PrivilegeMask>();
  vertical = input<boolean>(false);
  prohibit = input<boolean>(false);

  permissionList = computed(() => {
    let mask = this.permissions() ?? PrivilegeMaskConstant.None;
    const filter = this.filter() ?? PrivilegeMaskConstant.None;
    mask = mask & ~filter;
    const result: { label: string, enabled: boolean, flag: number, combined: boolean }[] = [
      { label: 'None', enabled: false, flag: 0, combined: true }
    ];
    for (const tl in PrivilegeMaskConstant) {
      const value = PrivilegeMaskConstant[tl]
      if (typeof value === "string") {
        // console.log(`Value: ${tl} -> ${PrivilegeMask[tl]}`);
        const val = +tl;
        if (val) {
          const combined = ((val & (val - 1)) !== 0);
          const isFiltered = (filter & val) === val;
          if (!isFiltered) {
            result.push({
              label: PrivilegeMaskConstant[val],
              flag: val,
              enabled: (mask & val) === val,
              combined: combined,
            });
          }
        }
      }
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

  public toggleFlag(val: { label: string, enabled: boolean, flag: number, combined: boolean }) {
    let mask = this.permissions() ?? (PrivilegeMask._0 | PrivilegeMaskConstant.None);
    if (val.flag === PrivilegeMaskConstant.None) {
      mask = PrivilegeMaskConstant.None;
    } else {
      if (val.enabled) {
        mask = mask & ~val.flag;
      } else {
        mask = mask | val.flag;
      }
    }
    // console.log(val, ((val.flag & (val.flag - 1)) !== 0), this.permissions(), mask);
    this.permissions.set(mask);
  }
}
