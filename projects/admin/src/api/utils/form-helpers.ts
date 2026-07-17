export function emptyToNullString(input: string | null): string | null {
  if (input === null || input === '') {
    return null;  // TODO: maybe trim?
  }
  return input;
}

export function nullToEmptyString(input: string | null | undefined): string {
  if (input === null || input === undefined) {
    return '';
  }
  return input;
}

export function nullToFalse(input: boolean | null | undefined): boolean {
  if (input === null || input === undefined) {
    return false;
  }
  return input;
}
