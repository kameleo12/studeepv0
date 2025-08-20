import { SearchResultsVM } from "@root/modules/search/core/models/search-results.view-model";

export namespace StarSearchResultsVM {
  export type Display = {
    hasStarted: boolean;
    isLoading: boolean;
    medias: TiktokMedia[];
  };

  export type TiktokMedia = SearchResultsVM.TiktokMedia;
}
