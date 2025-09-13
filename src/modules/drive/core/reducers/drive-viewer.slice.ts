// modules/drive/core/reducers/drive-viewer.slice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, DriveViewerState } from "@root/modules/store/app-state";
import { Dependencies } from "@root/modules/store/dependencies";

import { listFolder } from "./drive-tree.slice";
import { openFileUsecase } from "@root/modules/drive/core/usecases/open-entity.usecase";
import { updateFileContentUsecase } from "@root/modules/drive/core/usecases/update-file-content.usecase";

type ThunkCfg = { state: AppState; extra: Dependencies };

function isTextMime(mime: string | undefined): boolean {
  if (!mime) return false;
  if (mime.startsWith("text/")) return true;
  const textish = [
    "application/json",
    "application/javascript",
    "application/xml",
    "application/x-yaml",
    "application/x-sh",
    "application/markdown",
  ];
  return textish.includes(mime);
}

export const openFile = createAsyncThunk<
  { fileId: string; blobUrl: string | null; textContent: string | null },
  { fileId: string; mime?: string },
  ThunkCfg
>("viewer/openFile", async ({ fileId, mime }, { extra }) => {
  const blob = await openFileUsecase(extra)({ fileId });
  if (isTextMime(mime)) {
    const text = await blob.text();
    return { fileId, blobUrl: null, textContent: text };
  } else {
    const url = URL.createObjectURL(blob);
    return { fileId, blobUrl: url, textContent: null };
  }
});

export const saveTextFile = createAsyncThunk<void, { fileId: string; content: string; mime?: string }, ThunkCfg>(
  "viewer/saveTextFile",
  async ({ fileId, content, mime }, { extra, dispatch, getState }) => {
    const type = mime && mime.startsWith("text/") ? mime : "text/plain;charset=utf-8";
    const blob = new Blob([content], { type });
    await updateFileContentUsecase(extra)({ fileId, blob });
    // Rafraîchir le dossier courant pour mettre à jour taille/date
    const folderId = getState().driveTree.currentFolderId;
    await dispatch(listFolder({ folderId }));
  }
);

const initialState: DriveViewerState = {
  openedFileId: null,
  blobUrl: null,
  textContent: null,
  mode: "preview",
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "driveViewer",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<"preview" | "edit">) {
      state.mode = action.payload;
    },
    closeViewer(state) {
      if (state.blobUrl) {
        try { URL.revokeObjectURL(state.blobUrl); } catch {}
      }
      state.openedFileId = null;
      state.blobUrl = null;
      state.textContent = null;
      state.mode = "preview";
      state.loading = false;
      state.error = null;
    },
    setTextContent(state, action: PayloadAction<string>) {
      state.textContent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(openFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        // cleanup précédent
        if (state.blobUrl) {
          try { URL.revokeObjectURL(state.blobUrl); } catch {}
        }
        state.blobUrl = null;
        state.textContent = null;
      })
      .addCase(openFile.fulfilled, (state, action) => {
        state.openedFileId = action.payload.fileId;
        state.blobUrl = action.payload.blobUrl;
        state.textContent = action.payload.textContent;
        state.mode = action.payload.textContent != null ? "edit" : "preview";
        state.loading = false;
      })
      .addCase(openFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Impossible d’ouvrir le fichier";
      })
      .addCase(saveTextFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTextFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveTextFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Échec de l’enregistrement";
      });
  },
});

export const { setMode, closeViewer, setTextContent } = slice.actions;
export const driveViewerReducer = slice.reducer;
