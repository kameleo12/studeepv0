import { createReducer } from "@reduxjs/toolkit";

import { getMediaById } from "../usecases/media-getting/get-media-by-id.usecase";
import { getAuthorMostViral } from "../usecases/author-most-viral/get-author-most-viral.usecase";

import { getStarMediaById } from "../usecases/media-getting/get-star-media-by-id.usecase";

import { getLibraryMediaById } from "../usecases/media-getting/get-library-media-by-id.usecase";

import { AppState } from "@root/modules/store/app-state";
import { fetchMediaBlob } from "@root/modules/search/core/usecases/video-fetching/fetch-media-blob.usecase";

export const currentMediaReducer = createReducer<AppState["currentMedia"]>(
  {
    media: null,
    loading: false,
    authorMostViral: [],
  },
  (builder) => {
    builder.addCase(getMediaById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMediaById.fulfilled, (state, action) => {
      state.media = action.payload || null;
      state.loading = false;
    });
    builder.addCase(getMediaById.rejected, (state) => {
      state.media = null;
      state.loading = false;
    });

  }
);
