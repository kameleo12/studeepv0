// modules/store/app-state.ts
import { DriveDomainModel } from "@root/modules/drive/core/model/drive.domain-model";

export interface DriveTreeState {
  currentFolderId: string | null;
  foldersById: Record<string, DriveDomainModel.Folder>;
  filesById: Record<string, DriveDomainModel.File>;
  /**
   * Clé = folderId (string). Utiliser ROOT_FOLDER_KEY pour la racine.
   */
  childrenByFolderId: Record<string, { folders: string[]; files: string[] }>;
  loading: boolean;
  error?: string | null;
}

export interface DriveTransferState {
  uploadsById: Record<
    string,
    {
      id: string;
      name: string;
      progress: number;
      status: "idle" | "uploading" | "done" | "error";
      error?: string;
    }
  >;
}

export interface DriveViewerState {
  openedFileId: string | null;
  blobUrl: string | null;
  textContent: string | null;
  mode: "preview" | "edit";
  loading: boolean;
  error?: string | null;
}

export interface AppState {
  driveTree: DriveTreeState;
  driveTransfer: DriveTransferState;
  driveViewer: DriveViewerState;
}
