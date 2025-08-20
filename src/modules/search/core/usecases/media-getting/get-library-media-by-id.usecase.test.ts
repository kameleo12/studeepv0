import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { LibraryDomainModel } from "../../../../libraries/core/models/library.domain-model";
import { getLibraryMediaById } from "./get-library-media-by-id.usecase";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";
import { StubLibraryGateway } from "@root/modules/libraries/gateway-impl/stub-library.gateway";

describe("getLibraryMediaById", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let media1: LibraryDomainModel.TiktokMedia;
  let media2: LibraryDomainModel.TiktokMedia;
  let stubLibraryGateway: StubLibraryGateway;

  beforeEach(() => {
    media1 = createTiktokMediaFixture({ id: "m1" });
    media2 = createTiktokMediaFixture({ id: "m2" });

    stubLibraryGateway = new StubLibraryGateway(
      [
        {
          id: "lib-1",
          name: "Library 1",
          medias: [media1, media2],
        },
      ],
      [media1, media2]
    );

    store = createTestStore({
      initialState: {
        currentMedia: {
          media: null,
          authorMostViral: [],
          loading: false,
        },
      },
      dependencies: {
        libraryGateway: stubLibraryGateway,
      },
    });
    dispatch = store.dispatch;
  });

  it("should get the library media by id", async () => {
    await dispatch(getLibraryMediaById({ mediaId: "m1", libraryId: "lib-1" }));
    expect(store.getState().currentMedia.media).toEqual(media1);
  });
});
