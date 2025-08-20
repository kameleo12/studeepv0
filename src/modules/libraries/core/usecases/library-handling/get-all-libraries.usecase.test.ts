import { getAllLibraries } from "./get-all-libraries.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { LibraryDomainModel } from "../../models/library.domain-model";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";

describe("getAllLibraries usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let libraryGateway: StubLibraryGateway;

  beforeEach(() => {
    const media1 = createTiktokMediaFixture({ id: "m1" });
    const media2 = createTiktokMediaFixture({ id: "m2" });

    const libraries: LibraryDomainModel.Library[] = [
      {
        id: "lib_1",
        name: "Library 1",
        medias: [media1, media2],
      },
      {
        id: "lib_2",
        name: "Library 2",
        medias: [],
      },
    ];

    libraryGateway = new StubLibraryGateway(
      libraries.map((lib) => ({ ...lib })),
      [media1, media2]
    );

    const initialState = createInitialState({
      library: {
        libraries: [],
        currentLibrary: null,
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

  it("should handle loading state correctly when getting all libraries", async () => {
    expect(store.getState().library.loading).toBe(false);

    const promise = dispatch(getAllLibraries());
    expect(store.getState().library.loading).toBe(true);

    await promise;
    expect(store.getState().library.loading).toBe(false);
  });

  it("should get all libraries and update the store state", async () => {
    const result = await dispatch(getAllLibraries());
    expect(result.payload).toEqual<LibraryDomainModel.Library[]>([
      {
        id: "lib_1",
        name: "Library 1",
        medias: [expect.any(Object), expect.any(Object)],
      },
      {
        id: "lib_2",
        name: "Library 2",
        medias: [],
      },
    ]);

    expect(store.getState().library.libraries).toEqual(result.payload);
  });
});
