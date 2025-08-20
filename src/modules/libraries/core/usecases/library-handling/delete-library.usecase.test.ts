import { deleteLibrary } from "./delete-library.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { LibraryDomainModel } from "../../models/library.domain-model";

describe("deleteLibrary usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let libraryGateway: StubLibraryGateway;

  beforeEach(() => {
    const initialLibraries: LibraryDomainModel.Library[] = [
      {
        id: "lib_123",
        name: "Some Library",
        medias: [],
      },
      {
        id: "lib_456",
        name: "Another Library",
        medias: [],
      },
    ];

    libraryGateway = new StubLibraryGateway(
      initialLibraries.map((lib) => ({ ...lib, mediaIds: [] }))
    );

    const initialState = createInitialState({
      library: {
        libraries: initialLibraries,
        currentLibrary: initialLibraries[0],
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

  it("should handle loading state correctly when deleting a library", async () => {
    expect(store.getState().library.loading).toBe(false);

    const promise = dispatch(deleteLibrary({ libraryId: "lib_123" }));
    expect(store.getState().library.loading).toBe(true);

    await promise;
    expect(store.getState().library.loading).toBe(false);
  });

  it("should delete a library and update the store state", async () => {
    await dispatch(deleteLibrary({ libraryId: "lib_123" }));
    const { currentLibrary } = store.getState().library;
    expect(currentLibrary).toBeNull();
  });
});
