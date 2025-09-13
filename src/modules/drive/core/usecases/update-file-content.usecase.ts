// modules/drive/core/usecase/update-file-content.usecase.ts
import { IStorageGateway } from "../gateways/storage.gateway";

export const updateFileContentUsecase = (deps: { storageGateway: IStorageGateway }) =>
  async ({ fileId, blob }: { fileId: string; blob: Blob }) => {
    await deps.storageGateway.updateFile(fileId, blob);
  };
