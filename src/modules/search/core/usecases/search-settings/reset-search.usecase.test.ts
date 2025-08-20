import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { resetSearch } from "@root/modules/search/core/usecases/search-settings/reset-search.usecase";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

describe("Reset Search", () => {
  let dispatch: AppDispatch;
  let store: AppStore;

  beforeEach(() => {
    const tiktokMedia1 = createTiktokMediaFixture({
      id: "1",
      viewsCount: 1_000_000,
      viralScore: 20,
    });
    const tiktokMedia2 = createTiktokMediaFixture({
      id: "2",
      viewsCount: 10_000,
      viralScore: 90,
    });

    const initialState = createInitialState({
      tiktokMediasSearching: {
        results: [tiktokMedia1, tiktokMedia2],
        loading: false,
        started: true,
        query: "sample query",
        searchType: SearchDomainModel.SearchType.TIKTOK_URL,
        searchId: "search-id",
        sortOptions: "viewsCount",
      },
    });

    store = createTestStore({ initialState });
    dispatch = store.dispatch;
  });

  it("should reset the search state to its initial values", () => {
    dispatch(resetSearch());

    expect(store.getState().tiktokMediasSearching).toEqual({
      results: [],
      loading: false,
      started: false,
      query: "",
      searchType: SearchDomainModel.SearchType.KEYWORD,
      searchId: "",
      sortOptions: "viralScore",
    });
  });
});
