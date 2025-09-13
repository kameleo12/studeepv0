// modules/drive/core/model/drive.domain-model.ts
export namespace DriveDomainModel {
  export type EntityId = string;

  export type Folder = {
    id: EntityId;
    name: string;
    parentId: EntityId | null;
    createdAt: string;
    updatedAt: string;
    type: "folder";
  };

  export type File = {
    id: EntityId;
    name: string;
    mime: string;
    size: number;
    parentId: EntityId | null;
    createdAt: string;
    updatedAt: string;
    version: number;
    type: "file";
  };
}
