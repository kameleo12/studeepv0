import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";

export const selectQuerySuggestionsState = (state: AppState) =>
  state.querySuggestions;

export const selectQuerySuggestions = createSelector(
  selectQuerySuggestionsState,
  (querySuggestionsSearching) => ({
    suggestions: querySuggestionsSearching.suggestions,
    isLoading: querySuggestionsSearching.loading,
    error: querySuggestionsSearching.error,
    currentInput: querySuggestionsSearching.input,
  })
);
