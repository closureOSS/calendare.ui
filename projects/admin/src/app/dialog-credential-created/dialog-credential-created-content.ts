import { CredentialCreateResponse, UserCredentialCreateTemplate } from "../../api";

export interface DialogCredentialCreatedContent {
  credential: CredentialCreateResponse;
  template: UserCredentialCreateTemplate;
  title: string;
  intro: string;
  body: string | null;
  question: string;
  confirmOnly: boolean;
};
