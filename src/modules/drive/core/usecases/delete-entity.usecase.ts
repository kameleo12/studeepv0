// modules/drive/core/usecase/delete-entity.usecase.ts
import { IStorageGateway } from "../gateways/storage.gateway";

export const deleteEntityUsecase = (deps: { storageGateway: IStorageGateway }) =>
  async ({ entityId }: { entityId: string }) => {
    await deps.storageGateway.remove(entityId);
  };
