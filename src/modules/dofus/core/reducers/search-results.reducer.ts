// @root/modules/search/core/reducers/stuffs-searching.reducer.ts
import { createReducer } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import { getStuffResults } from "@root/modules/dofus/core/usecase/get-results.usecase";
import { searchStuffs } from "@root/modules/dofus/core/usecase/search-stuff.usecase";

export const stuffsSearchingReducer = createReducer<AppState["stuffsSearching"]>(
  {
    results: [],
    loading: false,
    started: false,
    query: "",
    searchId: "",
  },
  (builder) => {
    builder.addCase(searchStuffs.pending, (state) => {
      state.started = true;
      state.loading = true;
    });

    builder.addCase(searchStuffs.fulfilled, (state, action) => {
      state.query = action.payload.query;
      state.searchId = action.payload.searchId;
    });
    builder.addCase(getStuffResults.fulfilled, (state, action) => {
      state.results = action.payload;
      state.loading = false;
    });
  }
);
