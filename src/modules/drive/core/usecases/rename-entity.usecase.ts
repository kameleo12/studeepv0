// modules/drive/core/usecase/rename-entity.usecase.ts
import { IStorageGateway } from "../gateways/storage.gateway";

export const renameEntityUsecase = (deps: { storageGateway: IStorageGateway }) =>
  async ({ entityId, name }: { entityId: string; name: string }) => {
    const trimmed = name?.trim();
    if (!trimmed) throw new Error("Le nom est requis");
    await deps.storageGateway.rename(entityId, trimmed);
  };
