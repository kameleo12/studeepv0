import { createReducer } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";

import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";
import { getItemResults } from "@root/modules/lol/core/usecase/get-item-results";
import { searchItems } from "@root/modules/lol/core/usecase/search-item.usecase";

export type LolItemsSearchingState = AppState["lolItemsSearching"];

export const itemsSearchingReducer = createReducer<LolItemsSearchingState>(
  {
    results: [] as ItemDomainModel.Item[],
    query: "",
    loading: false,
    started: false,
    searchId: "",
  },
  (builder) => {
    builder.addCase(searchItems.pending, (state) => {
      state.started = true;
      state.loading = true;
    });
    builder.addCase(searchItems.fulfilled, (state, action) => {
      state.query = action.payload.query;
      state.searchId = action.payload.searchId;
    });
    builder.addCase(getItemResults.fulfilled, (state, action) => {
      state.results = action.payload;
      state.loading = false;
    });
  }
);
