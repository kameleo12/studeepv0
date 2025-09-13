// modules/drive/core/usecase/open-entity.usecase.ts
import { IStorageGateway } from "../gateways/storage.gateway";

export const openFileUsecase = (deps: { storageGateway: IStorageGateway }) =>
  async ({ fileId }: { fileId: string }) => {
    const blob = await deps.storageGateway.getFile(fileId);
    return blob;
  };
