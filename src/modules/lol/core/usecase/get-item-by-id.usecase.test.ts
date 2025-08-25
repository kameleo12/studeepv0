
import { createTestStore } from "@root/modules/testing/tests-environment";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";
import { createItemFixture } from "@root/modules/lol/core/testing/item.fixture";
import { StubItemsGateway } from "@root/modules/lol/gateways-impl/stub-items.gateway";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { getItemById } from "@root/modules/lol/core/usecase/get-item-by-id.usecase";

describe("LoL - Get item by id", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let itemsGateway: StubItemsGateway;
  let it1: ItemDomainModel.Item;
  let it2: ItemDomainModel.Item;

  beforeEach(() => {
    it1 = createItemFixture({ id: "i1" });
    it2 = createItemFixture({ id: "i2" });

    itemsGateway = new StubItemsGateway([it1, it2], { fixedSearchId: "search-id" });

    store = createTestStore({
      initialState: {
        lolItemsSearching: {
          results: [it1, it2],
          query: "q",
          loading: false,
          started: true,
          searchId: "search-id",
        },
        currentLolItem: {
          item: it1,
          loading: false,
        },
      } as any,
      dependencies: { itemsGateway },
    });

    dispatch = store.dispatch;
  });

  it("should get the item by id and handle loading state", async () => {
    expect(store.getState().currentLolItem.loading).toBe(false);

    const promise = dispatch(getItemById({ itemId: it1.id, searchId: "search-id" }));
    expect(store.getState().currentLolItem.loading).toBe(true);

    await promise;

    expect(store.getState().currentLolItem.loading).toBe(false);
    expect(store.getState().currentLolItem.item).toEqual(it1);
  });
});
