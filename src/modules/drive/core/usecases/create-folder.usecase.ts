// modules/drive/core/usecase/create-folder.usecase.ts
import { IStorageGateway } from "../gateways/storage.gateway";

export const createFolderUsecase = (deps: { storageGateway: IStorageGateway }) =>
  async ({ parentId, name }: { parentId: string | null; name: string }) => {
    const trimmed = name?.trim();
    if (!trimmed) throw new Error("Le nom du dossier est requis");
    const res = await deps.storageGateway.createFolder(parentId, trimmed);
    return res.id;
  };
