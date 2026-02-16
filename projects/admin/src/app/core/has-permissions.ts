import { PrivilegeMask } from "../../api/models";
import { PrivilegeMaskConstant } from "./privilege-mask";


export const hasPermission = (permissionMask: PrivilegeMask | undefined | null, required: PrivilegeMask | PrivilegeMaskConstant): boolean => {
  if (!permissionMask) {
    return false;
  }
  return (permissionMask & required) === required;
}
