import { StubTiktokMediasGateway } from "@root/modules/search/gateways-impl/stub-tiktok-medias.gateway";

import { ITiktokMediasGateway } from "@root/modules/search/core/gateways/tiktok-medias.gateway";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";
import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { getResults } from "@root/modules/search/core/usecases/search-results/get-results.usecase";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";

describe("Get Results", () => {
  let tiktokMediasGateway: ITiktokMediasGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let tiktokMedia1: SearchDomainModel.TiktokMedia;
  let tiktokMedia2: SearchDomainModel.TiktokMedia;

  beforeEach(() => {
    tiktokMedia1 = createTiktokMediaFixture({ id: "1" });
    tiktokMedia2 = createTiktokMediaFixture({ id: "2" });
    const state = createInitialState({
      tiktokMediasSearching: {
        searchId: "search-id",
        results: [],
        loading: true,
        started: false,
        query: "",
        searchType: SearchDomainModel.SearchType.KEYWORD,
        sortOptions: "viralScore",
      },
    });
    tiktokMediasGateway = new StubTiktokMediasGateway("search-id", [
      tiktokMedia1,
      tiktokMedia2,
    ]);

    store = createTestStore({
      dependencies: { tiktokMediasGateway },
      initialState: state,
    });
    dispatch = store.dispatch;
  });

  it("should get the results", async () => {
    await dispatch(getResults({ searchId: "search-id" }));

    expect(store.getState().tiktokMediasSearching.results).toEqual([
      tiktokMedia1,
      tiktokMedia2,
    ]);
  });

  it("should stop loading", async () => {
    await dispatch(getResults({ searchId: "search-id" }));

    expect(store.getState().tiktokMediasSearching.loading).toBe(false);
  });
});
