import { selectQuerySuggestions } from "./query-suggestion.selector";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { AppState } from "@root/modules/store/app-state";

describe("selectQuerySuggestions", () => {
  it("should return suggestions, loading, error, currentQuery", () => {
    const mockState: AppState = {
      tiktokMediasSearching: {
        results: [],
        loading: false,
        started: false,
        query: "",
        searchType: SearchDomainModel.SearchType.KEYWORD,
        searchId: "",
        sortOptions: "viralScore",
      },
      querySuggestions: {
        suggestions: ["hello world", "hello kitty"],
        loading: true,
        input: "hello",
        error: null,
      },
      currentMedia: {
        media: null,
        loading: false,
        authorMostViral: [],
      },
      starSearch: {
        results: [],
        loading: false,
      },
      library: {
        libraries: [],
        currentLibrary: null,
        loading: false,
        error: null,
      },
    };

    const result = selectQuerySuggestions(mockState);
    expect(result.suggestions).toEqual(["hello world", "hello kitty"]);
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
    expect(result.currentInput).toBe("hello");
  });
});
