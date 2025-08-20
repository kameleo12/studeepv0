import { LibraryDomainModel } from "@root/modules/libraries/core/models/library.domain-model";

export interface ILibraryGateway {
  createLibrary(
    libraryId: string,
    name: string,
    medias?: LibraryDomainModel.TiktokMedia[]
  ): Promise<void>;
  renameLibrary(libraryId: string, newName: string): Promise<void>;
  deleteLibrary(libraryId: string): Promise<void>;
  addMedia(libraryId: string, searchId: string, mediaId: string): Promise<void>;
  removeMedia(libraryId: string, mediaId: string): Promise<void>;
  reorderMedias(libraryId: string, newOrder: string[]): Promise<void>;
  getLibrary(libraryId: string): Promise<LibraryDomainModel.Library>;
  getAllLibraries(): Promise<LibraryDomainModel.Library[]>;
  getMediaById(
    mediaId: string,
    libraryId: string
  ): Promise<LibraryDomainModel.TiktokMedia | undefined>;
}
