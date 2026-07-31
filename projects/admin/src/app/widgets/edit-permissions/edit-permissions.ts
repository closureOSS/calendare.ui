import { booleanAttribute, Component, computed, input, model } from '@angular/core';
import { PrivilegeMaskConstant } from '../../core/privilege-mask';
import { PrivilegeMask } from '../../../api/models';

export interface PermissionListItem {
  label: string;
  flag: number;
  enabled: boolean;
  combined: boolean;
}

@Component({
  selector: 'cal-edit-permissions',
  imports: [],
  templateUrl: './edit-permissions.html',
})
export class EditPermissions {
  readonly PrivilegeMask = PrivilegeMask;
  permissions = model.required<PrivilegeMask | null | undefined>();
  filter = input<PrivilegeMask>();
  vertical = input<boolean>(false, { transform: booleanAttribute });
  prohibit = input<boolean>(false, { transform: booleanAttribute });

  permissionList = computed(() => {
    let mask = this.permissions() ?? PrivilegeMaskConstant.None;
    const filter = this.filter() ?? PrivilegeMaskConstant.None;
    mask = mask & ~filter;
    const result: PermissionListItem[] = [
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
            } as PermissionListItem);
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

  protected styling(perm: PermissionListItem) {
    const classes: string[] = [
      'text-sm', 'text-center',
      'px-4', 'py-1', 'min-w-20',
      'hover:cursor-pointer',
    ];
    if (perm.enabled) {
      classes.push(...[
        'shadow-xs', 'hover:shadow-sm',
      ]);
    } else {
      classes.push(...[
        'border', 'border-2', 'shadow-xs', 'hover:shadow-sm',
      ]);
    }
    if (perm.combined) {
      classes.push(...[
        'rounded-xl'
      ]);
    } else {
      classes.push(...[
        'rounded-none'
      ]);
    }
    if (perm.flag === 0) {
      classes.push('none');
    }
    if (perm.enabled) {
      if (this.prohibit()) {
        classes.push(...[
          'bg-prohibit', 'text-prohibit-foreground', 'border-prohibit', 'shadow-prohibit-800'
        ]);
      } else {
        classes.push(...[
          'bg-allow', 'text-allow-foreground', 'border-allow', 'shadow-allow',
        ]);
      }
    } else {
      if (perm.combined) {
        classes.push(...[
          'bg-accent', 'shadow-primary', 'dark:shadow-muted'
        ]);
      } else {
        classes.push(...[
          'bg-muted',
          'shadow-primary', 'dark:shadow-muted',
          'border-muted',
        ]);
      }
    }
    return classes;
  }
}
