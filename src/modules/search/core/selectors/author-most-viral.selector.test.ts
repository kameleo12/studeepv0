import { selectAuthorMostViral } from "@root/modules/search/core/selectors/author-most-viral.selector";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { TiktokMediaFactory } from "@root/modules/search/core/models/tiktok-media.factory";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

describe("AuthorMostViral Selectors", () => {
  let initialState: ReturnType<typeof createInitialState>;

  beforeEach(() => {
    initialState = createInitialState({
      currentMedia: {
        media: null,
        loading: false,
        authorMostViral: [
          TiktokMediaFactory.create({
            id: "1",
            description: "Most viral media 1",
            likesCount: 1234,
            viralScore: 7,
            uploadedAt: dayjs().subtract(1, "day").unix().toString(),
            thumbnail: "https://www.example.com/thumbnail1.jpg",
            viewsCount: 1_000_000,
            playUrl: "https://www.example.com/video1.mp4",
            duration: 60,
            author: {
              username: "test_user",
              followersCount: 5000,
              secUid: "secUidtest1",
            },
            cookie: "cookie1",
          }),
          TiktokMediaFactory.create({
            id: "2",
            description: "Most viral media 2",
            likesCount: 5678,
            viralScore: 9,
            uploadedAt: dayjs().subtract(2, "days").unix().toString(),
            thumbnail: "https://www.example.com/thumbnail2.jpg",
            viewsCount: 2_000_000,
            playUrl: "https://www.example.com/video2.mp4",
            duration: 120,
            author: {
              username: "test_user",
              followersCount: 5000,
              secUid: "secUidtest2",
            },
            cookie: "cookie2",
          }),
        ],
      },
    });
  });

  it("should return the author's most viral media transformed to the view model", () => {
    const authorMostViral = selectAuthorMostViral(initialState);

    expect(authorMostViral).toEqual([
      {
        id: "1",
        description: "Most viral media 1",
        viralScore: 7,
        likesCount: "1.2K",
        uploadedAt: "a day ago",
        viralScoreColor: "red",
        thumbnailUrl: "https://www.example.com/thumbnail1.jpg",
        viewsCount: 1_000_000,
        followersCount: "5K",
        secUid: "secUidtest1",
        playUrl: "https://www.example.com/video1.mp4",
        duration: "1:00",
        author: "test_user",
        cookie: "cookie1",
      },
      {
        id: "2",
        description: "Most viral media 2",
        viralScore: 9,
        likesCount: "5.6K",
        uploadedAt: "2 days ago",
        viralScoreColor: "red",
        thumbnailUrl: "https://www.example.com/thumbnail2.jpg",
        viewsCount: 2_000_000,
        followersCount: "5K",
        secUid: "secUidtest2",
        playUrl: "https://www.example.com/video2.mp4",
        duration: "2:00",
        author: "test_user",
        cookie: "cookie2",
      },
    ]);
  });

  it("should return an empty array if no author's most viral media exists", () => {
    initialState = createInitialState({
      currentMedia: {
        media: null,
        loading: false,
        authorMostViral: [],
      },
    });

    const authorMostViral = selectAuthorMostViral(initialState);
    expect(authorMostViral).toEqual([]);
  });
});
