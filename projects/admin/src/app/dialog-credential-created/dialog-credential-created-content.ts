import { CredentialCreateResponse, UserCredentialCreateTemplate } from "../../api";

export interface DialogCredentialCreatedContent {
  credential: CredentialCreateResponse;
  template: UserCredentialCreateTemplate;
};
