import { SchemaPath, maxLength, required, minLength, pattern, email } from "@angular/forms/signals";
import { TranslocoService } from "@jsverse/transloco";

export function usernameConfig(path: SchemaPath<string>, transloco: TranslocoService) {
  required(path, { message: transloco.translate('Username is required') });
  pattern(path, /^[0-9|a-z|.|\-|@]+$/, { message: transloco.translate('Lowercase only, a-z or 0-9 or dot, hypen or @') });
  email(path, { message: transloco.translate('Email is not valid'), when: ({ value }) => { return value().includes('@'); } });
  minLength(path, 5, { message: transloco.translate('Username should consist of 5 and upto 48 characters') });
  maxLength(path, 48, { message: transloco.translate('Username should consist of 5 and upto 48 characters') });
}

export function passwordConfig(path: SchemaPath<string>, transloco: TranslocoService) {
  maxLength(path, 64, { message: transloco.translate('Password should be less than 65 characters') });
  pattern(path, /^\S.+\S$/, { message: transloco.translate('Avoid leading or trailing whitespace') });
  // password minLength is intentionally not checked on client side
}
