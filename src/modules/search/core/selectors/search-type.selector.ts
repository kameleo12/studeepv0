import { createSelector } from "@reduxjs/toolkit";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { AppState } from "@root/modules/store/app-state";

export const selectSearchType: (state: AppState) => {
  value: SearchDomainModel.SearchType;
  canChange: boolean;
} = createSelector(
  (state: AppState) => state.tiktokMediasSearching,
  (tiktokMediasSearching) => ({
    value: tiktokMediasSearching.searchType,
    canChange: !tiktokMediasSearching.started,
  })
);
