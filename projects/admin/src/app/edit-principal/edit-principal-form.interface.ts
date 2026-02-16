export interface EditPrincipalFormData {
  displayName: string | null;
  fullname: string | null;  // check usage
  timezone?: string | null;
  email: string | null;
  description: string | null;
  color?: string | null;
  /*
  readonly
  */
  // uri: string;
  username: string | null;
  /*
    future use
  */
  locale: string | null;
  dateFormatType: string | null;
}
