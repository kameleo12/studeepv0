import { getStarMediaById } from "./get-star-media-by-id.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { StubTiktokMediasGateway } from "@root/modules/search/gateways-impl/stub-tiktok-medias.gateway";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

describe("Get star media by id", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let tiktokMediasGateway: StubTiktokMediasGateway;
  let media1: SearchDomainModel.TiktokMedia;
  let media2: SearchDomainModel.TiktokMedia;

  beforeEach(() => {
    media1 = createTiktokMediaFixture({ id: "1" });
    media2 = createTiktokMediaFixture({ id: "2" });

    tiktokMediasGateway = new StubTiktokMediasGateway("search-id", [
      media1,
      media2,
    ]);

    store = createTestStore({
      initialState: {
        starSearch: {
          results: [media1, media2],
          loading: false,
        },
        currentMedia: {
          media: media1,
          loading: false,
          authorMostViral: [],
        },
      },
      dependencies: {
        tiktokMediasGateway,
      },
    });

    dispatch = store.dispatch;
  });

  it("Should get the star media by id and handle loading state", async () => {
    expect(store.getState().currentMedia.loading).toBe(false);
    const promise = dispatch(getStarMediaById({ mediaId: media1.id }));
    expect(store.getState().currentMedia.loading).toBe(true);
    await promise;
    expect(store.getState().currentMedia.loading).toBe(false);
    expect(store.getState().currentMedia.media).toEqual(media1);
  });
});
