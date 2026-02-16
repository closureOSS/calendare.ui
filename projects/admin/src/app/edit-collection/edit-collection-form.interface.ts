// import { FormControl } from "@angular/forms";

// export interface EditCollectionForm {
//   uri: FormControl<string>;
//   name: FormControl<string>;
//   description: FormControl<string>;
//   timezone?: FormControl<string | null>;
//   color?: FormControl<string | null>;
//   excludeFreeBusy?: FormControl<boolean>;
// }


export interface EditCollectionFormData {
  uri: string;
  displayName: string | null;
  description: string | null;
  timezone?: string | null;
  color?: string | null;
  excludeFreeBusy?: boolean;
}
