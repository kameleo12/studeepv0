import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { changeSortingOption } from "@root/modules/search/core/usecases/search-results/change-sorting-option.usecase";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

describe("Change Sorting Option", () => {
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
        query: "",
        searchType: SearchDomainModel.SearchType.KEYWORD,
        searchId: "",
        sortOptions: "viralScore",
      },
    });

    store = createTestStore({ initialState });
    dispatch = store.dispatch;
  });

  it("should sort by viewsCount when option is changed", () => {
    dispatch(changeSortingOption("viewsCount"));

    expect(store.getState().tiktokMediasSearching.results).toEqual([
      expect.objectContaining({
        id: "1",
        viewsCount: 1_000_000,
        viralScore: 20,
      }),
      expect.objectContaining({
        id: "2",
        viewsCount: 10_000,
        viralScore: 90,
      }),
    ]);
  });

  it("should sort by viralScore when option is reset", () => {
    dispatch(changeSortingOption("viewsCount"));
    dispatch(changeSortingOption("viralScore"));

    expect(store.getState().tiktokMediasSearching.results).toEqual([
      expect.objectContaining({
        id: "2",
        viewsCount: 10_000,
        viralScore: 90,
      }),
      expect.objectContaining({
        id: "1",
        viewsCount: 1_000_000,
        viralScore: 20,
      }),
    ]);
  });
});
