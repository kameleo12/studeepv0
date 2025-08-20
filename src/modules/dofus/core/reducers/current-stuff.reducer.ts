import { createReducer } from "@reduxjs/toolkit";
import { getStuffById } from "@root/modules/dofus/core/usecase/get-stuff-by-id.usecase";

import { AppState } from "@root/modules/store/app-state";


export const currentStuffReducer = createReducer<AppState["currentStuff"]>(
  {
    stuff: null,
    loading: false,
  },
  (builder) => {
    builder.addCase(getStuffById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStuffById.fulfilled, (state, action) => {
      state.stuff = action.payload || null;
      state.loading = false;
    });
    builder.addCase(getStuffById.rejected, (state) => {
      state.stuff = null;
      state.loading = false;
    });
   
  }
);
