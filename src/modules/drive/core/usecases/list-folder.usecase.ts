// modules/drive/core/usecase/list-folder.usecase.ts
import { IStorageGateway } from "../gateways/storage.gateway";

export const listFolderUsecase = (deps: { storageGateway: IStorageGateway }) =>
  async ({ folderId }: { folderId: string | null }) => {
    return deps.storageGateway.list(folderId);
  };
