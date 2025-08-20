import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export namespace StarSearchDomainModel {
  export type TiktokMedia = SearchDomainModel.TiktokMedia;

  export type StarSearchState = {
    results: TiktokMedia[];
    loading: boolean;
  };
}
