import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { TiktokMediaFactory } from "@root/modules/search/core/models/tiktok-media.factory";
import { TiktokAuthorFactory } from "@root/modules/search/core/models/tiktok-author.factory";
import { AppState } from "@root/modules/store/app-state";
import { AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";
import { selectTiktokSearchResults } from "@root/modules/search/core/selectors/search-results.selector";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import dayjs from "dayjs";

describe("SearchResultsSelector", () => {
  let store: AppStore;
  let initialState: AppState;

  beforeEach(() => {
    initialState = createInitialState({
      tiktokMediasSearching: {
        searchId: "search-id",
        results: [
          TiktokMediaFactory.create({
            id: "1",
            description: "FIRST single rail montain coaster....",
            viralScore: 55,
            likesCount: 38990,
            duration: 60,
            uploadedAt: dayjs().subtract(2, "months").unix().toString(),
            author: TiktokAuthorFactory.create({ username: "Alex Ojeda" }),
          }),
          TiktokMediaFactory.create({
            id: "1",
            description: "FIRST single rail montain coaster....",
            viralScore: 81,
            likesCount: 38990,
            duration: 130,
            uploadedAt: dayjs().subtract(2, "months").toISOString(),
            author: TiktokAuthorFactory.create({ username: "Alex Ojeda" }),
          }),
          TiktokMediaFactory.create({
            id: "1",
            description: "FIRST single rail montain coaster....",
            viralScore: 71,
            likesCount: 38990,
            duration: 120,
            uploadedAt: dayjs().subtract(2, "months").toISOString(),
            author: TiktokAuthorFactory.create({ username: "Alex Ojeda" }),
          }),
        ],
        loading: false,
        started: true,
        query: "query",
        searchType: SearchDomainModel.SearchType.KEYWORD,
        sortOptions: "viralScore",
      },
    });
    store = createTestStore({
      initialState,
    });
  });

  it("should format the likesCount", () => {
    const results = selectTiktokSearchResults(store.getState());
    expect(results.medias[0].likesCount).toEqual("38.9K");
  });

  it("should format the date", () => {
    const results = selectTiktokSearchResults(store.getState());
    expect(results.medias[0].uploadedAt).toMatch(/^\d+ months? ago$/);
  });

  it("should show the correct viralScore printing color", () => {
    const results = selectTiktokSearchResults(store.getState());
    expect(results.medias[0].viralScoreColor).toEqual("red");
    expect(results.medias[1].viralScoreColor).toEqual("green");
    expect(results.medias[2].viralScoreColor).toEqual("orange");
  });

  it("should format the duration", () => {
    const results = selectTiktokSearchResults(store.getState());
    expect(results.medias[0].duration).toEqual("1:00");
    expect(results.medias[1].duration).toEqual("2:10");
    expect(results.medias[2].duration).toEqual("2:00");
  });
});
