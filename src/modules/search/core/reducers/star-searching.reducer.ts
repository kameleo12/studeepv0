import { createReducer } from "@reduxjs/toolkit";
import { getStarSearchResults } from "@root/modules/search/core/usecases/search-results/get-star-search-results.usecase";
import { fetchMediaBlob } from "@root/modules/search/core/usecases/video-fetching/fetch-media-blob.usecase";
import { AppState } from "@root/modules/store/app-state";

export const starSearchReducer = createReducer<AppState["starSearch"]>(
  {
    results: [],
    loading: false,
  },
  (builder) => {
    builder.addCase(getStarSearchResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStarSearchResults.fulfilled, (state, action) => {
      state.results = action.payload;
      state.loading = false;
    });
    builder.addCase(getStarSearchResults.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchMediaBlob.fulfilled, (state, action) => {
      const { playUrl, videoBlobUrl } = action.payload;
      const index = state.results.findIndex((m) => m.playUrl === playUrl);
      if (index !== -1) {
        state.results[index].blobUrl = videoBlobUrl;
      }
    });
  }
);
