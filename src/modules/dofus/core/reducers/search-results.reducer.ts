import { createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../../store/app-state";
import { getCharacterResults } from "../usecase/get-results.usecase";
import { searchCharacters } from "@root/modules/dofus/core/usecase/search-character.usecase";


export const charactersSearchingReducer = createReducer<
  AppState["charactersSearching"]
>(
  {
    results: [],
    loading: false,
    started: false,
    query: "",
    searchId: "",
  },
  (builder) => {
    builder.addCase(searchCharacters.pending, (state) => {
      state.started = true;
      state.loading = true;
    });

    builder.addCase(searchCharacters.fulfilled, (state, action) => {
      state.query = action.payload.query;
      state.searchId = action.payload.searchId;
    });
    builder.addCase(getCharacterResults.fulfilled, (state, action) => {
      state.results = action.payload;
      state.loading = false;
    });
  }
);
