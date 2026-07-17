import { CollectionType } from "../../api";

export interface CreateCollectionFormData {
  uri: string;
  collectionType: CollectionType | null;
}
