// modules/drive/core/reducers/drive-transfer.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DriveTransferState } from "@root/modules/store/app-state";
import { uploadFiles } from "./drive-tree.slice";

const initialState: DriveTransferState = {
  uploadsById: {},
};

const slice = createSlice({
  name: "driveTransfer",
  initialState,
  reducers: {
    startUpload(state, action: PayloadAction<{ id: string; name: string }>) {
      state.uploadsById[action.payload.id] = { id: action.payload.id, name: action.payload.name, progress: 0, status: "uploading" };
    },
    setUploadProgress(state, action: PayloadAction<{ id: string; progress: number }>) {
      const u = state.uploadsById[action.payload.id];
      if (u) u.progress = action.payload.progress;
    },
    finishUpload(state, action: PayloadAction<{ id: string }>) {
      const u = state.uploadsById[action.payload.id];
      if (u) { u.progress = 100; u.status = "done"; }
    },
    failUpload(state, action: PayloadAction<{ id: string; error: string }>) {
      const u = state.uploadsById[action.payload.id];
      if (u) { u.status = "error"; u.error = action.payload.error; }
    },
    clearUpload(state, action: PayloadAction<{ id: string }>) {
      delete state.uploadsById[action.payload.id];
    }
  },
  extraReducers: builder => {
    // Pour l’instant, on ne branche pas les events fins/pré-progress sur uploadFiles (synchrone rapide en IndexedDB).
    builder.addCase(uploadFiles.fulfilled, (state) => {
      // no-op
    });
  }
});

export const { startUpload, setUploadProgress, finishUpload, failUpload, clearUpload } = slice.actions;
export const driveTransferReducer = slice.reducer;
