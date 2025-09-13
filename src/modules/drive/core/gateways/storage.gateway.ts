// modules/drive/core/gateways/storage.gateway.ts
export interface IStorageGateway {
  list(folderId: string | null): Promise<{
    folders: Array<{ id: string; name: string; parentId: string | null; createdAt: string; updatedAt: string }>;
    files: Array<{ id: string; name: string; parentId: string | null; mime: string; size: number; createdAt: string; updatedAt: string; version: number }>;
  }>;

  getFile(fileId: string): Promise<Blob>;
  createFolder(parentId: string | null, name: string): Promise<{ id: string }>;
  uploadFile(params: { parentId: string | null; blob: Blob; name: string; mime: string }): Promise<{ id: string }>;
  updateFile(fileId: string, blob: Blob): Promise<void>;

  rename(entityId: string, name: string): Promise<void>;
  move(entityId: string, newParentId: string | null): Promise<void>;
  remove(entityId: string): Promise<void>;
}
