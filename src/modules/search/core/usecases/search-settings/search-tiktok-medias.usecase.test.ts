import { ITiktokMediasGateway } from "@root/modules/search/core/gateways/tiktok-medias.gateway";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";
import { searchTiktokMedias } from "@root/modules/search/core/usecases/search-settings/search-tiktok-medias.usecase";
import { StubTiktokMediasGateway } from "@root/modules/search/gateways-impl/stub-tiktok-medias.gateway";
import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";

describe("Search Tiktok Medias", () => {
  let tiktokMediasGateway: ITiktokMediasGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let tiktokMedia1: SearchDomainModel.TiktokMedia;
  let tiktokMedia2: SearchDomainModel.TiktokMedia;

  beforeEach(() => {
    tiktokMedia1 = createTiktokMediaFixture({ id: "1" });
    tiktokMedia2 = createTiktokMediaFixture({ id: "2" });
    tiktokMediasGateway = new StubTiktokMediasGateway("search-id", [
      tiktokMedia1,
      tiktokMedia2,
    ]);

    store = createTestStore({ dependencies: { tiktokMediasGateway } });
    dispatch = store.dispatch;
  });

  test("Initially, the search type is KEYWORD", () => {
    expect(store.getState().tiktokMediasSearching.searchType).toBe(
      SearchDomainModel.SearchType.KEYWORD
    );
  });

  it("should update the query", async () => {
    await dispatch(searchTiktokMedias({ query: "query" }));

    expect(store.getState().tiktokMediasSearching.query).toBe("query");
  });

  it("should directly mark the search as started", () => {
    dispatch(searchTiktokMedias({ query: "Query" }));

    expect(store.getState().tiktokMediasSearching.started).toBe(true);
  });

  it("should handle the loading state", async () => {
    expect(store.getState().tiktokMediasSearching.loading).toBe(false);

    const promise = dispatch(searchTiktokMedias({ query: "query" }));

    expect(store.getState().tiktokMediasSearching.loading).toBe(true);
  });

  describe("When the search type is keyword", () => {
    it("should called searchByKeyword", async () => {
      const spy = jest.spyOn(tiktokMediasGateway, "searchByKeyword");

      await dispatch(searchTiktokMedias({ query: "query" }));

      expect(spy).toHaveBeenCalled();
    });
  });

  it("should set the searchId", async () => {
    await dispatch(searchTiktokMedias({ query: "query" }));

    expect(store.getState().tiktokMediasSearching.searchId).toBe("search-id");
  });
});
