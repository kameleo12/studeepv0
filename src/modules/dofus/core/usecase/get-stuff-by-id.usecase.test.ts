import { getStuffById } from "./get-stuff-by-id.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StuffDomainModel } from "../model/stuff.domain-model";
import { StubStuffsGateway } from "@root/modules/dofus/gateways-impl/stub-stuffs.gateway";
import { createStuffFixture } from "@root/modules/dofus/core/testing/stuff.fixture";



describe("Get stuff by id", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let stuffsGateway: StubStuffsGateway;
  let stuff1: StuffDomainModel.Stuff;
  let stuff2: StuffDomainModel.Stuff;

  beforeEach(() => {
    stuff1 = createStuffFixture({ id: "1" });
    stuff2 = createStuffFixture({ id: "2" });

    stuffsGateway = new StubStuffsGateway("search-id", [stuff1, stuff2]);

    store = createTestStore({
      initialState: {
        stuffsSearching: {
          results: [stuff1, stuff2],
          query: "testquery",
          loading: false,
          started: true,
          searchId: "search-id",
        },
        currentStuff: {
          stuff: stuff1,
          loading: false,
        },
      },
      dependencies: {
        stuffsGateway,
      },
    });

    dispatch = store.dispatch;
  });

  it("Should get the stuff by id and handle loading state", async () => {
    expect(store.getState().currentStuff.loading).toBe(false);

    const promise = dispatch(
      getStuffById({ stuffId: stuff1.id, searchId: "search-id" })
    );

    expect(store.getState().currentStuff.loading).toBe(true);

    await promise;

    expect(store.getState().currentStuff.loading).toBe(false);
    expect(store.getState().currentStuff.stuff).toEqual(stuff1);
  });
});
