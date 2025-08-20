import { getAuthorMostViral } from "./get-author-most-viral.usecase";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { StubTiktokMediasGateway } from "@root/modules/search/gateways-impl/stub-tiktok-medias.gateway";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { createTiktokMediaFixture } from "@root/modules/search/core/testing/tiktok-media.fixture";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

describe("Get author most viral", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let tiktokMediasGateway: StubTiktokMediasGateway;
  let media1: SearchDomainModel.TiktokMedia;
  let media2: SearchDomainModel.TiktokMedia;
  let media3: SearchDomainModel.TiktokMedia;
  const secUid = "testsecUid";

  beforeEach(() => {
    media1 = createTiktokMediaFixture({
      id: "1",
      description: "Viral video 1",
      viewsCount: 1000000,
    });
    media2 = createTiktokMediaFixture({
      id: "2",
      description: "Viral video 2",
      viewsCount: 2000000,
    });
    media3 = createTiktokMediaFixture({
      id: "3",
      description: "Viral video 3",
      viewsCount: 500000,
    });

    tiktokMediasGateway = new StubTiktokMediasGateway("test-search-id", [
      media1,
      media2,
      media3,
    ]);

    store = createTestStore({
      initialState: {
        currentMedia: {
          media: null,
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

  it("Should get the most viral media for a given author and handle loading state", async () => {
    tiktokMediasGateway.getAuthorMostViral = jest
      .fn()
      .mockResolvedValue([media2, media1]);

    expect(store.getState().currentMedia.loading).toBe(false);
    const promise = dispatch(getAuthorMostViral({ secUid }));
    expect(store.getState().currentMedia.loading).toBe(true);
    await promise;
    expect(store.getState().currentMedia.loading).toBe(false);
    expect(store.getState().currentMedia.authorMostViral).toEqual([
      media2,
      media1,
    ]);
    expect(tiktokMediasGateway.getAuthorMostViral).toHaveBeenCalledWith(secUid);
  });
});
