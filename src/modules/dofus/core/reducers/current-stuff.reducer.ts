import { createReducer } from "@reduxjs/toolkit";
import { getCharacterById } from "../usecase/get-stuff-by-id.usecase";
import { AppState } from "../../../store/app-state";

export const currentCharacterReducer = createReducer<
  AppState["currentCharacter"]
>(
  {
    character: null,
    loading: false,
  },
  (builder) => {
    builder.addCase(getCharacterById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCharacterById.fulfilled, (state, action) => {
      state.character = action.payload || null;
      state.loading = false;
    });
    builder.addCase(getCharacterById.rejected, (state) => {
      state.character = null;
      state.loading = false;
    });
  }
);
