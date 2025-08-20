import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { AppState } from "@root/modules/store/app-state";

export const createInitialState = (state?: Partial<AppState>): AppState => ({
  tiktokMediasSearching: {
    searchId: "search-id",
    results: [],
    loading: false,
    started: false,
    query: "",
    searchType: SearchDomainModel.SearchType.KEYWORD,
    sortOptions: "viralScore",
  },
  currentMedia: {
    media: null,
    loading: false,
    authorMostViral: [],
  },
  starSearch: {
    results: [],
    loading: false,
  },
  querySuggestions: {
    suggestions: [],
    loading: false,
    input: "",
    error: null,
  },
  library: {
    libraries: [],
    currentLibrary: null,
    loading: false,
    error: null,
  },
    stuffsSearching: {
          results: [],
          query: "testquery",
          loading: false,
          started: true,
          searchId: "search-id",
        },

        currentStuff: {
          stuff: null,
          loading: false,
        },
  ...state,
});
