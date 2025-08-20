import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { TiktokMediaFactory } from "@root/modules/search/core/models/tiktok-media.factory";
import { TiktokAuthorFactory } from "@root/modules/search/core/models/tiktok-author.factory";
import { AppState } from "@root/modules/store/app-state";
import { AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { selectStarSearchResults } from "@root/modules/search/core/selectors/star-search-results.selector";
import dayjs from "dayjs";

describe("StarSearchResultsSelector", () => {
  let store: AppStore;
  let initialState: AppState;

  beforeEach(() => {
    initialState = createInitialState({
      starSearch: {
        results: [
          TiktokMediaFactory.create({
            id: "1",
            description: "Star Video 1",
            viralScore: 55,
            likesCount: 38990,
            duration: 60,
            uploadedAt: dayjs().subtract(2, "months").unix().toString(),
            author: TiktokAuthorFactory.create({ username: "StarUser1" }),
          }),
          TiktokMediaFactory.create({
            id: "2",
            description: "Star Video 2",
            viralScore: 81,
            likesCount: 38990,
            duration: 130,
            uploadedAt: dayjs().subtract(6, "month").unix().toString(),
            author: TiktokAuthorFactory.create({ username: "StarUser2" }),
          }),
          TiktokMediaFactory.create({
            id: "3",
            description: "Star Video 3",
            viralScore: 71,
            likesCount: 38990,
            duration: 120,
            uploadedAt: dayjs().subtract(3, "days").unix().toString(),
            author: TiktokAuthorFactory.create({ username: "StarUser3" }),
          }),
        ],
        loading: false,
      },
    });
    store = createTestStore({
      initialState,
    });
  });

  it("should format the likesCount", () => {
    const results = selectStarSearchResults(store.getState());
    expect(results.medias[0].likesCount).toEqual("38.9K");
  });

  it("should format the date", () => {
    const results = selectStarSearchResults(store.getState());
    expect(results.medias[0].uploadedAt).toMatch(/^\d+ months? ago$/);
    expect(results.medias[1].uploadedAt).toMatch(/^\d+ months? ago$/);
    expect(results.medias[2].uploadedAt).toMatch(/^\d+ days? ago$/);
  });

  it("should show the correct viralScore printing color", () => {
    const results = selectStarSearchResults(store.getState());
    expect(results.medias[0].viralScoreColor).toEqual("red");
    expect(results.medias[1].viralScoreColor).toEqual("green");
    expect(results.medias[2].viralScoreColor).toEqual("orange");
  });

  it("should format the duration", () => {
    const results = selectStarSearchResults(store.getState());
    expect(results.medias[0].duration).toEqual("1:00");
    expect(results.medias[1].duration).toEqual("2:10");
    expect(results.medias[2].duration).toEqual("2:00");
  });

  it("should format the author name", () => {
    const results = selectStarSearchResults(store.getState());
    expect(results.medias[0].author).toEqual("StarUser1");
    expect(results.medias[1].author).toEqual("StarUser2");
    expect(results.medias[2].author).toEqual("StarUser3");
  });

  it("should set hasStarted to true and isLoading to false", () => {
    const results = selectStarSearchResults(store.getState());
    expect(results.hasStarted).toBe(true);
    expect(results.isLoading).toBe(false);
  });
});
