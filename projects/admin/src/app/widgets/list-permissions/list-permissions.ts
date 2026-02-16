import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PrivilegeMaskConstant } from '../../core/privilege-mask';
import { PrivilegeMask } from '../../../api/models';

@Component({
  selector: 'cal-list-permissions',
  imports: [
  ],
  templateUrl: './list-permissions.html',
  styleUrl: './list-permissions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPermissions {
  readonly PrivilegeMask = PrivilegeMaskConstant;
  permissions = input.required<PrivilegeMask | null | undefined>();
  filter = input<PrivilegeMask>();
  vertical = input<boolean>(false);
  prohibit = input<boolean>(false);

  permissionList = computed(() => {
    let mask = this.permissions();
    const filter = this.filter() ?? PrivilegeMaskConstant.None;
    if (!mask) {
      return ['None'];
    }
    mask = mask & ~filter;
    const all = PrivilegeMaskConstant.All & ~filter;
    if ((mask & all) === all) {
      return ['All'];
    }
    const result: string[] = [];
    for (const tl in PrivilegeMaskConstant) {
      const value = PrivilegeMaskConstant[tl]

      if (typeof value === "string") {
        // console.log(`Value: ${tl} -> ${PrivilegeMask[tl]}`);
        const val = +tl;
        if (val) {
          if ((mask & val) === val) {
            result.push(PrivilegeMaskConstant[val]);
          }
        }
      }
    }
    if (result.length === 0) {
      result.push('None');
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
