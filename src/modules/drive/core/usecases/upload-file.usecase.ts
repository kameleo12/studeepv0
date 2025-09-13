// modules/drive/core/usecase/upload-file.usecase.ts
import { IStorageGateway } from "../gateways/storage.gateway";

export const uploadFileUsecase = (deps: { storageGateway: IStorageGateway }) =>
  async (params: { parentId: string | null; blob: Blob; name: string; mime: string }) => {
    if (!params.name?.trim()) throw new Error("Le nom du fichier est requis");
    return deps.storageGateway.uploadFile({
      parentId: params.parentId,
      blob: params.blob,
      name: params.name.trim(),
      mime: params.mime || "application/octet-stream",
    });
  };
