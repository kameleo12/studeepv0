import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { changeSearchType } from "@root/modules/search/core/usecases/search-settings/change-search-type.usecase";
import { AppDispatch, AppStore } from "@root/modules/store/store";
import { createTestStore } from "@root/modules/testing/tests-environment";

describe("Change search type", () => {
  let dispatch: AppDispatch;
  let store: AppStore;

  beforeEach(() => {
    store = createTestStore();
    dispatch = store.dispatch;
  });

  it("should change the search type to keyword", () => {
    dispatch(changeSearchType(SearchDomainModel.SearchType.TIKTOK_URL));

    expect(store.getState().tiktokMediasSearching.searchType).toBe(
      SearchDomainModel.SearchType.TIKTOK_URL
    );
  });
});
