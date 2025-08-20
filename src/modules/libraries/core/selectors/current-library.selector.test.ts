import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { AppStore } from "@root/modules/store/store";
import { AppState } from "@root/modules/store/app-state";
import { selectCurrentLibrary } from "@root/modules/libraries/core/selectors/current-library.selector";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

describe("selectCurrentLibrary", () => {
  let store: AppStore;
  let initialState: AppState;

  beforeEach(() => {
    initialState = createInitialState({
      library: {
        libraries: [],
        currentLibrary: null,
        loading: false,
        error: null,
      },
    });
    store = createTestStore({ initialState });
  });

  it("should return default values when there is no current library", () => {
    const result = selectCurrentLibrary(store.getState());
    expect(result.hasLibrary).toBe(false);
    expect(result.isLoading).toBe(false);
    expect(result.libraryName).toBe("");
    expect(result.medias).toEqual([]);
  });

  it("should indicate presence of library when one is set", () => {
    const libraryState = {
      id: "lib-1",
      name: "My Library",
      medias: [],
    };
    store = createTestStore({
      initialState: {
        ...initialState,
        library: {
          libraries: [],
          currentLibrary: libraryState,
          loading: true,
          error: null,
        },
      },
    });
    const result = selectCurrentLibrary(store.getState());
    expect(result.hasLibrary).toBe(true);
    expect(result.isLoading).toBe(true);
    expect(result.libraryName).toBe("My Library");
    expect(result.medias).toEqual([]);
  });

  it("should format likesCount and uploadedAt correctly", () => {
    const uploadedAt = dayjs().subtract(1, "month").unix().toString();
    const libraryState = {
      id: "lib-2",
      name: "Test Library",
      medias: [
        {
          id: "media-1",
          description: "Description",
          viralScore: 50,
          likesCount: 3456,
          uploadedAt,
          thumbnail: "http://thumbnail.jpg",
          viewsCount: 10000,
          author: {
            username: "John Doe",
            followersCount: 9999,
            secUid: "secUidtest1",
          },
          playUrl: "http://playurl.mp4",
          duration: 90,
          cookie: "cookie",
        },
      ],
    };
    store = createTestStore({
      initialState: {
        ...initialState,
        library: {
          libraries: [],
          currentLibrary: libraryState,
          loading: false,
          error: null,
        },
      },
    });
    const result = selectCurrentLibrary(store.getState());
    expect(result.medias[0].likesCount).toBe("3.4K");
    expect(result.medias[0].uploadedAt).toMatch(/month ago$/);
  });

  it("should determine the correct viralScoreColor", () => {
    const libraryState = {
      id: "lib-3",
      name: "Test Library",
      medias: [
        {
          id: "media-2",
          description: "High score",
          viralScore: 80,
          likesCount: 2000,
          uploadedAt: dayjs().unix().toString(),
          thumbnail: "",
          viewsCount: 100,
          author: {
            username: "Author1",
            followersCount: 500,
            secUid: "secUidtest2",
          },
          playUrl: "",
          duration: 60,
          cookie: "cookie",
        },
        {
          id: "media-3",
          description: "Medium score",
          viralScore: 70,
          likesCount: 2000,
          uploadedAt: dayjs().unix().toString(),
          thumbnail: "",
          viewsCount: 100,
          author: {
            username: "Author2",
            followersCount: 500,
            secUid: "secUidtest3",
          },
          playUrl: "",
          duration: 60,
          cookie: "cookie",
        },
        {
          id: "media-4",
          description: "Lower score",
          viralScore: 40,
          likesCount: 2000,
          uploadedAt: dayjs().unix().toString(),
          thumbnail: "",
          viewsCount: 100,
          author: {
            username: "Author3",
            followersCount: 500,
            secUid: "secUidtest4",
          },
          playUrl: "",
          duration: 60,
          cookie: "cookie",
        },
      ],
    };
    store = createTestStore({
      initialState: {
        ...initialState,
        library: {
          libraries: [],
          currentLibrary: libraryState,
          loading: false,
          error: null,
        },
      },
    });
    const result = selectCurrentLibrary(store.getState());
    expect(result.medias[0].viralScoreColor).toBe("green");
    expect(result.medias[1].viralScoreColor).toBe("orange");
    expect(result.medias[2].viralScoreColor).toBe("red");
  });

  it("should format duration correctly", () => {
    const libraryState = {
      id: "lib-4",
      name: "Test Library",
      medias: [
        {
          id: "media-5",
          description: "Short video",
          viralScore: 30,
          likesCount: 100,
          uploadedAt: dayjs().unix().toString(),
          thumbnail: "",
          viewsCount: 10,
          author: {
            username: "User1",
            followersCount: 50,
            secUid: "secUidtest5",
          },
          playUrl: "",
          duration: 59,
          cookie: "cookie",
        },
        {
          id: "media-6",
          description: "Longer video",
          viralScore: 60,
          likesCount: 100,
          uploadedAt: dayjs().unix().toString(),
          thumbnail: "",
          viewsCount: 10,
          author: {
            username: "User2",
            followersCount: 50,
            secUid: "secUidtest6",
          },
          playUrl: "",
          duration: 125,
          cookie: "cookie",
        },
      ],
    };
    store = createTestStore({
      initialState: {
        ...initialState,
        library: {
          libraries: [],
          currentLibrary: libraryState,
          loading: false,
          error: null,
        },
      },
    });
    const result = selectCurrentLibrary(store.getState());
    expect(result.medias[0].duration).toBe("0:59");
    expect(result.medias[1].duration).toBe("2:05");
  });
});
