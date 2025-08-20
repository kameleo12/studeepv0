import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { selectSearchType } from "@root/modules/search/core/selectors/search-type.selector";
import { AppState } from "@root/modules/store/app-state";
import { AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";

describe("SearchResultsSelector", () => {
  let store: AppStore;
  let initialState: AppState;

  beforeEach(() => {
    initialState = createInitialState({
      tiktokMediasSearching: {
        searchId: "search-id",
        results: [],
        loading: false,
        started: false,
        query: "query",
        searchType: SearchDomainModel.SearchType.KEYWORD,
        sortOptions: "viralScore",
      },
    });
    store = createTestStore({
      initialState,
    });
  });

  it("should return the search type", () => {
    const searchTypeVM = selectSearchType(store.getState());
    expect(searchTypeVM.value).toEqual(SearchDomainModel.SearchType.KEYWORD);
    expect(searchTypeVM.canChange).toBe(true);
  });
  it("should not be able to change the search type if the search already started", () => {
    initialState = {
      ...initialState,
      tiktokMediasSearching: {
        ...initialState.tiktokMediasSearching,
        started: true,
      },
    };
    store = createTestStore({
      initialState,
    });
    const searchTypeVM = selectSearchType(store.getState());
    expect(searchTypeVM.value).toEqual(SearchDomainModel.SearchType.KEYWORD);
    expect(searchTypeVM.canChange).toBe(false);
  });
});
