import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";

export const selectLibrariesList = createSelector(
  (state: AppState) => state.library.libraries,
  (libraries) => {
    return libraries.map((library) => ({
      id: library.id,
      name: library.name,
      totalMedias: library.medias?.length || 0,
    }));
  }
);

export const selectLibrariesLoading = (state: AppState) =>
  state.library.loading;
