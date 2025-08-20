import { reorderLibraryMedias } from "./reorder-library-medias.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { LibraryDomainModel } from "../../models/library.domain-model";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";

describe("reorderLibraryMedias usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let libraryGateway: StubLibraryGateway;
  let media1: LibraryDomainModel.TiktokMedia;
  let media2: LibraryDomainModel.TiktokMedia;
  let media3: LibraryDomainModel.TiktokMedia;
  let initialLibrary: LibraryDomainModel.Library;

  beforeEach(() => {
    media1 = createTiktokMediaFixture({ id: "m1" });
    media2 = createTiktokMediaFixture({ id: "m2" });
    media3 = createTiktokMediaFixture({ id: "m3" });

    initialLibrary = {
      id: "lib_123",
      name: "My Library",
      medias: [media1, media2, media3],
    };

    libraryGateway = new StubLibraryGateway(
      [{ ...initialLibrary }],
      [media1, media2, media3]
    );

    const state = createInitialState({
      library: {
        libraries: [initialLibrary],
        currentLibrary: initialLibrary,
        loading: false,
        error: null,
      },
    });
    store = createTestStore({
      dependencies: { libraryGateway },
      initialState: state,
    });
    dispatch = store.dispatch;
  });

  it("should handle loading state correctly when reordering medias", async () => {
    expect(store.getState().library.loading).toBe(false);
    const promise = dispatch(
      reorderLibraryMedias({
        libraryId: "lib_123",
        newOrder: ["m2", "m3", "m1"],
      })
    );
    expect(store.getState().library.loading).toBe(true);
    await promise;
    expect(store.getState().library.loading).toBe(false);
  });

  it("should reorder medias if valid", async () => {
    await dispatch(
      reorderLibraryMedias({
        libraryId: "lib_123",
        newOrder: ["m2", "m3", "m1"],
      })
    );
    const { currentLibrary } = store.getState().library;
    expect(currentLibrary).toBeDefined();
    expect(currentLibrary!.medias).toEqual([
      expect.objectContaining({ id: "m2" }),
      expect.objectContaining({ id: "m3" }),
      expect.objectContaining({ id: "m1" }),
    ]);
  });
});
