// modules/drive/core/usecase/move-entity.usecase.ts
import { IStorageGateway } from "../gateways/storage.gateway";

export const moveEntityUsecase = (deps: { storageGateway: IStorageGateway }) =>
  async ({ entityId, newParentId }: { entityId: string; newParentId: string | null }) => {
    await deps.storageGateway.move(entityId, newParentId);
  };
