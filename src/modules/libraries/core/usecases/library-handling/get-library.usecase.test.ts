import { getLibrary } from "./get-library.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { LibraryDomainModel } from "../../models/library.domain-model";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";

describe("getLibrary usecase", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let libraryGateway: StubLibraryGateway;

  beforeEach(() => {
    const media1 = createTiktokMediaFixture({ id: "m1" });
    const library: LibraryDomainModel.Library = {
      id: "lib_123",
      name: "My Library",
      medias: [media1],
    };

    libraryGateway = new StubLibraryGateway([{ ...library }], [media1]);

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

  it("should handle loading state correctly when getting a library", async () => {
    expect(store.getState().library.loading).toBe(false);
    const promise = dispatch(getLibrary({ libraryId: "lib_123" }));
    expect(store.getState().library.loading).toBe(true);
    await promise;
    expect(store.getState().library.loading).toBe(false);
  });

  it("should get the library and update the store state", async () => {
    const result = await dispatch(getLibrary({ libraryId: "lib_123" }));
    expect(result.payload).toEqual<LibraryDomainModel.Library>({
      id: "lib_123",
      name: "My Library",
      medias: [
        {
          id: "m1",
          author: expect.any(Object),
          thumbnail: expect.any(String),
          viralScore: expect.any(Number),
          likesCount: expect.any(Number),
          duration: expect.any(Number),
          uploadedAt: expect.any(String),
          viewsCount: expect.any(Number),
          playUrl: expect.any(String),
          description: expect.any(String),
          cookie: "cookie",
        },
      ],
    });
    expect(store.getState().library.currentLibrary).toEqual(result.payload);
  });
});
