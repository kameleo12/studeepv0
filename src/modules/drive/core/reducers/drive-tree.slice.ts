// modules/drive/core/reducers/drive-tree.slice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, DriveTreeState } from "@root/modules/store/app-state";
import { Dependencies } from "@root/modules/store/dependencies";
import { DriveDomainModel } from "../model/drive.domain-model";

import { toFolderKey } from "../constants";
import { createFolderUsecase } from "@root/modules/drive/core/usecases/create-folder.usecase";
import { deleteEntityUsecase } from "@root/modules/drive/core/usecases/delete-entity.usecase";
import { listFolderUsecase } from "@root/modules/drive/core/usecases/list-folder.usecase";
import { moveEntityUsecase } from "@root/modules/drive/core/usecases/move-entity.usecase";
import { renameEntityUsecase } from "@root/modules/drive/core/usecases/rename-entity.usecase";
import { uploadFileUsecase } from "@root/modules/drive/core/usecases/upload-file.usecase";

type ThunkCfg = { state: AppState; extra: Dependencies };

export const listFolder = createAsyncThunk<
  { folderId: string | null; folders: DriveDomainModel.Folder[]; files: DriveDomainModel.File[] },
  { folderId: string | null },
  ThunkCfg
>("drive/listFolder", async ({ folderId }, { extra }) => {
  const res = await listFolderUsecase(extra)({ folderId });
  return {
    folderId,
    folders: res.folders.map((f) => ({ ...f, type: "folder" as const })),
    files: res.files.map((f) => ({ ...f, type: "file" as const })),
  };
});

export const createFolder = createAsyncThunk<string, { parentId: string | null; name: string }, ThunkCfg>(
  "drive/createFolder",
  async ({ parentId, name }, { extra, dispatch }) => {
    const id = await createFolderUsecase(extra)({ parentId, name });
    await dispatch(listFolder({ folderId: parentId }));
    return id;
  }
);

export const uploadFiles = createAsyncThunk<void, { parentId: string | null; files: File[] }, ThunkCfg>(
  "drive/uploadFiles",
  async ({ parentId, files }, { extra, dispatch }) => {
    for (const f of files) {
      const blob = new Blob([await f.arrayBuffer()], { type: f.type || "application/octet-stream" });
      await uploadFileUsecase(extra)({ parentId, blob, name: f.name, mime: f.type });
    }
    await dispatch(listFolder({ folderId: parentId }));
  }
);

export const renameEntity = createAsyncThunk<void, { entityId: string; name: string }, ThunkCfg>(
  "drive/renameEntity",
  async ({ entityId, name }, { extra, dispatch, getState }) => {
    await renameEntityUsecase(extra)({ entityId, name });
    const folderId = getState().driveTree.currentFolderId;
    await dispatch(listFolder({ folderId }));
  }
);

export const moveEntity = createAsyncThunk<void, { entityId: string; newParentId: string | null }, ThunkCfg>(
  "drive/moveEntity",
  async ({ entityId, newParentId }, { extra, dispatch, getState }) => {
    await moveEntityUsecase(extra)({ entityId, newParentId });
    const folderId = getState().driveTree.currentFolderId;
    await dispatch(listFolder({ folderId }));
  }
);

export const deleteEntity = createAsyncThunk<void, { entityId: string }, ThunkCfg>(
  "drive/deleteEntity",
  async ({ entityId }, { extra, dispatch, getState }) => {
    await deleteEntityUsecase(extra)({ entityId });
    const folderId = getState().driveTree.currentFolderId;
    await dispatch(listFolder({ folderId }));
  }
);

const initialState: DriveTreeState = {
  currentFolderId: null,
  foldersById: {},
  filesById: {},
  childrenByFolderId: {},
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "driveTree",
  initialState,
  reducers: {
    setCurrentFolder(state, action: PayloadAction<string | null>) {
      state.currentFolderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listFolder.fulfilled, (state, action) => {
        const { folderId, folders, files } = action.payload;

        for (const f of folders) state.foldersById[f.id] = f;
        for (const f of files) state.filesById[f.id] = f;

        const key = toFolderKey(folderId);
        state.childrenByFolderId[key] = {
          folders: folders.map((f) => f.id),
          files: files.map((f) => f.id),
        };

        state.currentFolderId = folderId;
        state.loading = false;
      })
      .addCase(listFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Erreur lors du chargement du dossier";
      })
      .addCase(renameEntity.rejected, (state, action) => {
        state.error = action.error?.message || "Erreur lors du renommage";
      })
      .addCase(moveEntity.rejected, (state, action) => {
        state.error = action.error?.message || "Erreur lors du déplacement";
      })
      .addCase(deleteEntity.rejected, (state, action) => {
        state.error = action.error?.message || "Erreur lors de la suppression";
      });
  },
});

export const { setCurrentFolder } = slice.actions;
export const driveTreeReducer = slice.reducer;
