import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { StarSearchDomainModel } from "@root/modules/search/core/models/star-search.domain-model";
import { LibraryDomainModel } from "@root/modules/libraries/core/models/library.domain-model";
import { StuffDomainModel } from "@root/modules/dofus/core/model/stuff.domain-model";

export interface AppState {
  // Ancien slice
  tiktokMediasSearching: {
    results: SearchDomainModel.TiktokMedia[];
    query: string;
    loading: boolean;
    started: boolean;
    searchType: SearchDomainModel.SearchType;
    searchId: string;
    sortOptions: SearchDomainModel.SortOptions;
  };
  currentMedia: {
    media: SearchDomainModel.TiktokMedia | null;
    loading: boolean;
    authorMostViral: SearchDomainModel.TiktokMedia[];
  };

  // ✅ Nouveau slice pour Stuff
  stuffsSearching: {
    results: StuffDomainModel.Stuff[];
    query: string;
    loading: boolean;
    started: boolean;
    searchId: string;
  };
  currentStuff: {
    stuff: StuffDomainModel.Stuff | null;
    loading: boolean;
  };

  // Inchangé
  starSearch: {
    results: StarSearchDomainModel.TiktokMedia[];
    loading: boolean;
  };
  querySuggestions: {
    suggestions: string[];
    loading: boolean;
    input: string;
    error: string | null;
  };
  library: {
    libraries: LibraryDomainModel.Library[];
    currentLibrary: LibraryDomainModel.Library | null;
    loading: boolean;
    error?: string | null;
  };
}
