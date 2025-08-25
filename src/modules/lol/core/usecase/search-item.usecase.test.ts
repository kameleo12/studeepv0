
import { StubItemsGateway } from "@root/modules/lol/gateways-impl/stub-items.gateway";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { IItemsGateway } from "@root/modules/lol/core/gateways/items.gateway";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";
import { createItemFixture } from "@root/modules/lol/core/testing/item.fixture";
import { searchItems } from "@root/modules/lol/core/usecase/search-item.usecase";

describe("LoL - Search Items", () => {
  let itemsGateway: IItemsGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let it1: ItemDomainModel.Item;
  let it2: ItemDomainModel.Item;

  beforeEach(() => {
    it1 = createItemFixture({ id: "i1", name: "Amplifying Tome" });
    it2 = createItemFixture({ id: "i2", name: "Long Sword", stats: {
      AD: 10,
      AP: 0,
      PV: 0,
      RM: 0,
      R: 0,
      abilityHaste: 0,
      attackSpeed: 0,
      movementSpeed: 0
    } });

    itemsGateway = new StubItemsGateway([it1, it2], { fixedSearchId: "search-id" });

    store = createTestStore({ dependencies: { itemsGateway } });
    dispatch = store.dispatch;
  });

  it("should update the query in state", async () => {
    await dispatch(searchItems({ query: "ap" }));
    expect(store.getState().lolItemsSearching.query).toBe("ap");
  });

  it("should directly mark the search as started (pending)", () => {
    dispatch(searchItems({ query: "ap" }));
    expect(store.getState().lolItemsSearching.started).toBe(true);
    expect(store.getState().lolItemsSearching.loading).toBe(true);
  });

  it("should call gateway.searchByKeyword", async () => {
    const spy = jest.spyOn(itemsGateway, "searchByKeyword");
    await dispatch(searchItems({ query: "ap" }));
    expect(spy).toHaveBeenCalledWith("ap");
  });

  it("should set the searchId", async () => {
    await dispatch(searchItems({ query: "ap" }));
    expect(store.getState().lolItemsSearching.searchId).toBe("search-id");
  });
});
