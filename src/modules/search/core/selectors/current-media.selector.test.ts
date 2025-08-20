import { selectCurrentMedia } from "@root/modules/search/core/selectors/current-media.selector";
import { SearchResultsVM } from "@root/modules/search/core/models/search-results.view-model";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { TiktokMediaFactory } from "@root/modules/search/core/models/tiktok-media.factory";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

describe("CurrentMedia Selectors", () => {
  let initialState: ReturnType<typeof createInitialState>;

  beforeEach(() => {
    initialState = createInitialState({
      currentMedia: {
        media: TiktokMediaFactory.create({
          id: "1",
          description: "test current media",
          likesCount: 1234,
          viralScore: 7,
          uploadedAt: dayjs().subtract(1, "day").unix().toString(),
          author: {
            username: "test_user",
            followersCount: 5000,
            secUid: "secUidtest1",
          },
          cookie: "cookie1",
        }),
        loading: false,
        authorMostViral: [],
      },
    });
  });

  it("should return the current media transformed to the view model", () => {
    const currentMedia: SearchResultsVM.TiktokMedia | null =
      selectCurrentMedia(initialState);

    expect(currentMedia).toEqual({
      id: "1",
      description: "test current media",
      viralScore: 7,
      likesCount: "1.2K",
      uploadedAt: "a day ago",
      viralScoreColor: "red",
      thumbnailUrl: "thumbnail",
      viewsCount: 1,
      followersCount: "5K",
      secUid: "secUidtest1",
      playUrl: "https://www.example.com/video.mp4",
      duration: "0:01",
      author: "test_user",
      cookie: "cookie1",
    });
  });

  it("should return null if no current media exists", () => {
    initialState = createInitialState({
      currentMedia: {
        media: null,
        loading: false,
        authorMostViral: [],
      },
    });

    const currentMedia = selectCurrentMedia(initialState);
    expect(currentMedia).toBeNull();
  });
});
