// @root/modules/dofus/core/usecase/__tests__/search-stuffs.usecase.spec.ts
import { IStuffsGateway } from "@root/modules/dofus/core/gateways/stuff.gateway";
import { StuffDomainModel } from "@root/modules/dofus/core/model/stuff.domain-model";
import { createStuffFixture } from "@root/modules/dofus/core/testing/stuff.fixture";
import { searchStuffs } from "@root/modules/dofus/core/usecase/search-stuff.usecase";
import { StubStuffsGateway } from "@root/modules/dofus/gateways-impl/stub-stuffs.gateway";


import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";


describe("Search Stuffs", () => {
  let stuffsGateway: IStuffsGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let stuff1: StuffDomainModel.Stuff;
  let stuff2: StuffDomainModel.Stuff;

  beforeEach(() => {
    stuff1 = createStuffFixture({ id: "1" });
    stuff2 = createStuffFixture({ id: "2" });

    stuffsGateway = new StubStuffsGateway("search-id", [stuff1, stuff2]);

    store = createTestStore({ dependencies: { stuffsGateway } });
    dispatch = store.dispatch;
  });

  it("should update the query in state", async () => {
    await dispatch(searchStuffs({ query: "query" }));
    expect(store.getState().stuffsSearching.query).toBe("query");
  });

  it("should directly mark the search as started (pending)", () => {
    dispatch(searchStuffs({ query: "Query" }));
    expect(store.getState().stuffsSearching.started).toBe(true);
    expect(store.getState().stuffsSearching.loading).toBe(true);
  });

  it("should call gateway.searchByKeyword", async () => {
    const spy = jest.spyOn(stuffsGateway, "searchByKeyword");
    await dispatch(searchStuffs({ query: "query" }));
    expect(spy).toHaveBeenCalledWith("query");
  });

  it("should set the searchId", async () => {
    await dispatch(searchStuffs({ query: "query" }));
    expect(store.getState().stuffsSearching.searchId).toBe("search-id");
  });
});
