// modules/drive/core/selectors/drive.selectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import { DriveDomainModel } from "../model/drive.domain-model";
import { toFolderKey } from "../constants";

export const selectCurrentFolderId = (s: AppState) => s.driveTree.currentFolderId;
export const selectFoldersById = (s: AppState) => s.driveTree.foldersById;
export const selectFilesById = (s: AppState) => s.driveTree.filesById;
export const selectChildrenIndex = (folderId: string | null) => (s: AppState) =>
  s.driveTree.childrenByFolderId[toFolderKey(folderId)] || { folders: [], files: [] };

/**
 * Selector factory paramétré par folderId.
 * À utiliser avec useMemo(() => makeSelectChildren(folderId), [folderId])
 * pour que l’instance du selector reste stable dans le composant.
 */
export const makeSelectChildren = (folderId: string | null) =>
  createSelector(
    [selectChildrenIndex(folderId), selectFoldersById, selectFilesById],
    (ids, foldersById, filesById): { folders: DriveDomainModel.Folder[]; files: DriveDomainModel.File[] } => {
      const folders = ids.folders.map((id: string) => foldersById[id]).filter(Boolean);
      const files = ids.files.map((id: string) => filesById[id]).filter(Boolean);
      return { folders, files };
    }
 );

/** Renvoie le dossier par id (pas besoin de mémo, on retourne la même ref que dans le state) */
export const selectFolderById =
  (id: string) =>
  (s: AppState): DriveDomainModel.Folder | undefined =>
    s.driveTree.foldersById[id];

/** Renvoie le fichier par id (pareil, ref identique au state) */
export const selectFileById =
  (id: string) =>
  (s: AppState): DriveDomainModel.File | undefined =>
    s.driveTree.filesById[id];

/** Fil d’Ariane mémoïsé (renvoie la même référence si currentFolderId / foldersById n’ont pas changé) */
export const selectBreadcrumb = createSelector(
  [(s: AppState) => s.driveTree.currentFolderId, selectFoldersById],
  (currentFolderId, foldersById): DriveDomainModel.Folder[] => {
    const chain: DriveDomainModel.Folder[] = [];
    let currId = currentFolderId;
    while (currId) {
      const f = foldersById[currId];
      if (!f) break;
      chain.unshift(f);
      currId = f.parentId;
    }
    return chain;
  }
);
