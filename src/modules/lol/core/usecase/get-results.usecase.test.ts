

import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";

import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { IStuffsGateway } from "@root/modules/dofus/core/gateways/stuff.gateway";
import { StuffDomainModel } from "@root/modules/dofus/core/model/stuff.domain-model";
import { getStuffResults } from "@root/modules/dofus/core/usecase/get-results.usecase";
import { StubStuffsGateway } from "@root/modules/dofus/gateways-impl/stub-stuffs.gateway";
import { createStuffFixture } from "@root/modules/dofus/core/testing/stuff.fixture";

describe("Get Stuff Results", () => {
  let stuffsGateway: IStuffsGateway;
  let dispatch: AppDispatch;
  let store: AppStore;
  let stuff1: StuffDomainModel.Stuff;
  let stuff2: StuffDomainModel.Stuff;

  beforeEach(() => {
    stuff1 = createStuffFixture({ id: "1" });
    stuff2 = createStuffFixture({ id: "2" });

    const state = createInitialState({
      stuffsSearching: {
        searchId: "search-id",
        results: [],
        loading: true,
        started: false,
        query: "",
      },
    });

    stuffsGateway = new StubStuffsGateway("search-id", [stuff1, stuff2]);

    store = createTestStore({
      dependencies: { stuffsGateway },
      initialState: state,
    });
    dispatch = store.dispatch;
  });

  it("should get the results", async () => {
    await dispatch(getStuffResults({ searchId: "search-id" }));

    expect(store.getState().stuffsSearching.results).toEqual([stuff1, stuff2]);
  });

  it("should stop loading", async () => {
    await dispatch(getStuffResults({ searchId: "search-id" }));

    expect(store.getState().stuffsSearching.loading).toBe(false);
  });
});
