import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { getStarSearchResults } from "@root/modules/search/core/usecases/search-results/get-star-search-results.usecase";
import { StubTiktokMediasGateway } from "@root/modules/search/gateways-impl/stub-tiktok-medias.gateway";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";

describe("Get Star Search Results", () => {
  let tiktokMediasGateway: StubTiktokMediasGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let tiktokMedia1: SearchDomainModel.TiktokMedia;
  let tiktokMedia2: SearchDomainModel.TiktokMedia;

  beforeEach(() => {
    tiktokMedia1 = createTiktokMediaFixture({
      id: "1",
      description: "Star Video 1",
    });
    tiktokMedia2 = createTiktokMediaFixture({
      id: "2",
      description: "Star Video 2",
    });

    tiktokMediasGateway = new StubTiktokMediasGateway("star-search-id", [
      tiktokMedia1,
      tiktokMedia2,
    ]);

    const initialState = createInitialState({
      starSearch: {
        results: [],
        loading: false,
      },
    });

    store = createTestStore({
      dependencies: { tiktokMediasGateway },
      initialState,
    });

    dispatch = store.dispatch;
  });

  it("should set loading to true while retrieving star search results", async () => {
    expect(store.getState().starSearch.loading).toBe(false);

    const promise = dispatch(getStarSearchResults());
    expect(store.getState().starSearch.loading).toBe(true);

    await promise;
    expect(store.getState().starSearch.loading).toBe(false);
  });

  it("should retrieve the star search results and update the store", async () => {
    await dispatch(getStarSearchResults());
    expect(store.getState().starSearch.results).toEqual([
      tiktokMedia1,
      tiktokMedia2,
    ]);
  });

  it("should handle errors and set loading to false", async () => {
    tiktokMediasGateway.getStarSearchResults = jest
      .fn()
      .mockRejectedValue(new Error("API Error"));

    await dispatch(getStarSearchResults());
    expect(store.getState().starSearch.loading).toBe(false);
    expect(store.getState().starSearch.results).toEqual([]);
  });
});
