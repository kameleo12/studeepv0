// modules/drive/core/constants.ts
export const ROOT_FOLDER_KEY = "__root__";
export const toFolderKey = (id: string | null): string => id ?? ROOT_FOLDER_KEY;

/** MIME perso pour le DnD interne des entités du Drive */
export const DRIVE_DND_MIME = "application/x-drive-entity";

/** Payload transporté pendant le drag d’une entité */
export type DriveDragPayload = {
  id: string;
  kind: "file" | "folder";
  fromParentId: string | null;
};
