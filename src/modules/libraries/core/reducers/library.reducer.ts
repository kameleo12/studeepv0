import { createReducer } from "@reduxjs/toolkit";
import { LibraryDomainModel } from "../models/library.domain-model";
import { createLibrary } from "../usecases/library-handling/create-library.usecase";
import { getLibrary } from "../usecases/library-handling/get-library.usecase";
import { getAllLibraries } from "../usecases/library-handling/get-all-libraries.usecase";
import { renameLibrary } from "../usecases/library-handling/rename-library.usecase";
import { deleteLibrary } from "../usecases/library-handling/delete-library.usecase";
import { addMediaToLibrary } from "../usecases/media-in-library/add-media-to-library.usecase";
import { removeMediaFromLibrary } from "../usecases/media-in-library/remove-media-from-library.usecase";
import { reorderLibraryMedias } from "../usecases/media-in-library/reorder-library-medias.usecase";
import { fetchMediaBlob } from "@root/modules/search/core/usecases/video-fetching/fetch-media-blob.usecase";

type LibraryState = {
  libraries: LibraryDomainModel.Library[];
  currentLibrary: LibraryDomainModel.Library | null;
  loading: boolean;
  error?: string | null;
};

const initialState: LibraryState = {
  libraries: [],
  currentLibrary: null,
  loading: false,
  error: null,
};

export const libraryReducer = createReducer(initialState, (builder) => {
  builder.addCase(createLibrary.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(createLibrary.fulfilled, (state, action) => {
    state.loading = false;
    state.libraries.push({
      id: action.meta.arg.libraryId,
      name: action.meta.arg.name,
      medias: action.meta.arg.medias || [],
    });
  });
  builder.addCase(createLibrary.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });

  builder.addCase(getLibrary.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(getLibrary.fulfilled, (state, action) => {
    state.loading = false;
    state.currentLibrary = action.payload;
  });
  builder.addCase(getLibrary.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });

  builder.addCase(renameLibrary.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(renameLibrary.fulfilled, (state, action) => {
    state.loading = false;
    if (state.currentLibrary?.id === action.meta.arg.libraryId) {
      state.currentLibrary.name = action.meta.arg.newName;
    }
  });
  builder.addCase(renameLibrary.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });

  builder.addCase(deleteLibrary.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(deleteLibrary.fulfilled, (state, action) => {
    state.loading = false;
    if (state.currentLibrary?.id === action.meta.arg.libraryId) {
      state.currentLibrary = null;
    }
  });
  builder.addCase(deleteLibrary.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });

  builder.addCase(addMediaToLibrary.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(addMediaToLibrary.fulfilled, (state) => {
    state.loading = false;
  });
  builder.addCase(addMediaToLibrary.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });

  builder.addCase(removeMediaFromLibrary.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(removeMediaFromLibrary.fulfilled, (state, action) => {
    state.loading = false;
    if (state.currentLibrary?.id === action.meta.arg.libraryId) {
      state.currentLibrary.medias = state.currentLibrary.medias.filter(
        (m) => m.id !== action.meta.arg.mediaId
      );
    }
  });
  builder.addCase(removeMediaFromLibrary.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });

  builder.addCase(reorderLibraryMedias.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(reorderLibraryMedias.fulfilled, (state, action) => {
    state.loading = false;
    if (state.currentLibrary?.id === action.meta.arg.libraryId) {
      const mediaMap = new Map(
        state.currentLibrary.medias.map((m) => [m.id, m])
      );
      state.currentLibrary.medias = action.meta.arg.newOrder.map(
        (id) => mediaMap.get(id)!
      );
    }
  });
  builder.addCase(reorderLibraryMedias.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });

  builder.addCase(getAllLibraries.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(getAllLibraries.fulfilled, (state, action) => {
    state.loading = false;
    state.libraries = action.payload;
  });
  builder.addCase(getAllLibraries.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });

  builder.addCase(fetchMediaBlob.fulfilled, (state, action) => {
    const { playUrl, videoBlobUrl } = action.payload;
    if (state.currentLibrary) {
      const index = state.currentLibrary.medias.findIndex((m) => {
        return m.playUrl === playUrl;
      });
      if (index !== -1) {
        state.currentLibrary.medias[index].blobUrl = videoBlobUrl;
      } else {
        console.error("No media found with playUrl:", playUrl);
      }
    }
  });
});
