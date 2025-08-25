import { createReducer } from "@reduxjs/toolkit";
import { getItemById } from "@root/modules/lol/core/usecase/get-item-by-id.usecase";
import { AppState } from "@root/modules/store/app-state";


export const currentItemReducer = createReducer<AppState["currentLolItem"]>(
  {
    item: null,
    loading: false,
  },
  (builder) => {
    builder.addCase(getItemById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getItemById.fulfilled, (state, action) => {
      state.item = action.payload ?? null;
      state.loading = false;
    });
    builder.addCase(getItemById.rejected, (state) => {
      state.loading = false;
    });
  }
);
