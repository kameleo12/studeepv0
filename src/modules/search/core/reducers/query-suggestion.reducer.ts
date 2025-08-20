import { createReducer } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import { getQuerySuggestions } from "@root/modules/search/core/usecases/search-settings/get-query-suggestions.usecase";

const initialState: AppState["querySuggestions"] = {
  suggestions: [],
  loading: false,
  input: "",
  error: null,
};

export const querySuggestionsReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(getQuerySuggestions.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      if (action.meta.arg) {
        state.input = action.meta.arg.input;
      }
    });

    builder.addCase(getQuerySuggestions.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestions = action.payload;
    });

    builder.addCase(getQuerySuggestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error fetching suggestions";
    });
  }
);
