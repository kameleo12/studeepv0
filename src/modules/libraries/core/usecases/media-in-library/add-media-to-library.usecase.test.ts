import { addMediaToLibrary } from "./add-media-to-library.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";

describe("addMediaToLibrary usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let libraryGateway: StubLibraryGateway;
  let media1: ReturnType<typeof createTiktokMediaFixture>;
  const initialLibrary = {
    id: "lib_123",
    name: "My Library",
    medias: [],
  };

  beforeEach(() => {
    media1 = createTiktokMediaFixture({
      id: "m1",
      description: "Media #1",
    });

    libraryGateway = new StubLibraryGateway([{ ...initialLibrary }], [media1]);

    const initialState = createInitialState({
      library: {
        libraries: [initialLibrary],
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

  it("should handle loading state correctly when adding a media", async () => {
    expect(store.getState().library.loading).toBe(false);
    const promise = dispatch(
      addMediaToLibrary({
        libraryId: "lib_123",
        searchId: "search_999",
        mediaId: "m1",
      })
    );
    expect(store.getState().library.loading).toBe(true);
    await promise;
    expect(store.getState().library.loading).toBe(false);
  });

  it("should call libraryGateway.addMedia with the correct arguments", async () => {
    const addMediaSpy = jest.spyOn(libraryGateway, "addMedia");

    await dispatch(
      addMediaToLibrary({
        libraryId: "lib_123",
        searchId: "search_999",
        mediaId: "m1",
      })
    );

    expect(addMediaSpy).toHaveBeenCalledWith("lib_123", "search_999", "m1");

    const { libraries } = store.getState().library;
    const updatedLibrary = libraries.find((lib) => lib.id === "lib_123");
    expect(updatedLibrary).toBeDefined();
  });
});
