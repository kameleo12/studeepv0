import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";

import { IItemsGateway } from "@root/modules/lol/core/gateways/items.gateway";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";
import { createItemFixture } from "@root/modules/lol/core/testing/item.fixture";

import { StubItemsGateway } from "@root/modules/lol/gateways-impl/stub-items.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { getItemResults } from "@root/modules/lol/core/usecase/get-item-results";

describe("LoL - Get Item Results", () => {
  let itemsGateway: IItemsGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let it1: ItemDomainModel.Item;
  let it2: ItemDomainModel.Item;

  beforeEach(() => {
    it1 = createItemFixture({ id: "i1" });
    it2 = createItemFixture({ id: "i2" });

    const state = createInitialState({
      lolItemsSearching: {
        searchId: "search-id",
        results: [],
        loading: true,
        started: false,
        query: "",
      },
    } as any);

    itemsGateway = new StubItemsGateway([it1, it2], { fixedSearchId: "search-id" });

    store = createTestStore({
      dependencies: { itemsGateway },
      initialState: state,
    });
    dispatch = store.dispatch;
  });

  it("should get the results", async () => {
    await dispatch(getItemResults({ searchId: "search-id" }));
    expect(store.getState().lolItemsSearching.results).toEqual([it1, it2]);
  });

  it("should stop loading", async () => {
    await dispatch(getItemResults({ searchId: "search-id" }));
    expect(store.getState().lolItemsSearching.loading).toBe(false);
  });
});
