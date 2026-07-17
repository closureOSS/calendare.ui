export interface EditPrincipalFormData {
  displayName: string;
  timezone: string | null;
  email: string;
  description: string;
  color: string;
  /*
    future use
  */
  locale: string;
  dateFormatType: string;
}
