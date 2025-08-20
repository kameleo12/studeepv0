import { createLibrary } from "./create-library.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { LibraryDomainModel } from "../../models/library.domain-model";

describe("createLibrary usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let libraryGateway: StubLibraryGateway;

  beforeEach(() => {
    libraryGateway = new StubLibraryGateway();
    const state = createInitialState({});
    store = createTestStore({
      dependencies: { libraryGateway },
      initialState: state,
    });
    dispatch = store.dispatch;
  });

  describe("Happy path", () => {
    it("should create a library and update the store state", async () => {
      await dispatch(
        createLibrary({ libraryId: "lib_123", name: "My Library" })
      );
      const { libraries } = store.getState().library;
      expect(libraries).toEqual<LibraryDomainModel.Library[]>([
        {
          id: "lib_123",
          name: "My Library",
          medias: [],
        },
      ]);
    });
  });

  describe("Loading state", () => {
    it("should handle correctly the loading state", async () => {
      expect(store.getState().library.loading).toBe(false);

      const promise = dispatch(
        createLibrary({ libraryId: "lib_123", name: "My Library" })
      );
      expect(store.getState().library.loading).toBe(true);

      await promise;
      expect(store.getState().library.loading).toBe(false);
    });
  });
});
