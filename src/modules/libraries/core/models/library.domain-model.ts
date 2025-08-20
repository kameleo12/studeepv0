import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export namespace LibraryDomainModel {
  export type TiktokMedia = SearchDomainModel.TiktokMedia;

  export type Library = {
    id: string;
    name: string;
    medias: TiktokMedia[];
  };
}
