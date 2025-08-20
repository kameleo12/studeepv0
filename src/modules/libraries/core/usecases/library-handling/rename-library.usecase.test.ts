import { renameLibrary } from "./rename-library.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { LibraryDomainModel } from "../../models/library.domain-model";

describe("renameLibrary usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let libraryGateway: StubLibraryGateway;

  beforeEach(() => {
    const initialLibrary: LibraryDomainModel.Library = {
      id: "lib_123",
      name: "Old Name",
      medias: [],
    };

    libraryGateway = new StubLibraryGateway([{ ...initialLibrary }]);

    const initialState = createInitialState({
      library: {
        libraries: [initialLibrary],
        currentLibrary: initialLibrary,
        loading: false,
        error: null,
      },
    });
    store = createTestStore({
      dependencies: { libraryGateway },
      initialState,
    });
    dispatch = store.dispatch;
  });

  it("should handle loading state correctly when renaming a library", async () => {
    expect(store.getState().library.loading).toBe(false);
    const promise = dispatch(
      renameLibrary({ libraryId: "lib_123", newName: "New Name" })
    );
    expect(store.getState().library.loading).toBe(true);
    await promise;
    expect(store.getState().library.loading).toBe(false);
  });

  it("should rename a library and update the store state", async () => {
    await dispatch(
      renameLibrary({ libraryId: "lib_123", newName: "New Name" })
    );
    const { currentLibrary } = store.getState().library;
    expect(currentLibrary).toEqual({
      id: "lib_123",
      name: "New Name",
      medias: [],
    });
  });
});
