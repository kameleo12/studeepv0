import { removeMediaFromLibrary } from "./remove-media-from-library.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { LibraryDomainModel } from "../../models/library.domain-model";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";

describe("removeMediaFromLibrary usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let libraryGateway: StubLibraryGateway;
  let media1: LibraryDomainModel.TiktokMedia;
  let media2: LibraryDomainModel.TiktokMedia;
  let initialLibrary: LibraryDomainModel.Library;

  beforeEach(() => {
    media1 = createTiktokMediaFixture({ id: "m1" });
    media2 = createTiktokMediaFixture({ id: "m2" });

    initialLibrary = {
      id: "lib_123",
      name: "My Library",
      medias: [media1, media2],
    };

    libraryGateway = new StubLibraryGateway(
      [{ ...initialLibrary }],
      [media1, media2]
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

  it("should handle loading state correctly when removing a media", async () => {
    expect(store.getState().library.loading).toBe(false);
    const promise = dispatch(
      removeMediaFromLibrary({ libraryId: "lib_123", mediaId: "m1" })
    );
    expect(store.getState().library.loading).toBe(true);
    await promise;
    expect(store.getState().library.loading).toBe(false);
  });

  it("should remove a media from the library", async () => {
    await dispatch(
      removeMediaFromLibrary({ libraryId: "lib_123", mediaId: "m1" })
    );
    const { currentLibrary } = store.getState().library;
    expect(currentLibrary).toBeDefined();
    expect(currentLibrary!.medias).toEqual([
      expect.objectContaining({ id: "m2" }),
    ]);
  });
});
