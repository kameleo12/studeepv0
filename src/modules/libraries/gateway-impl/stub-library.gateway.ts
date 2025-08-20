import { ILibraryGateway } from "../core/gateways/library.gateway";
import { LibraryDomainModel } from "../core/models/library.domain-model";

export class StubLibraryGateway implements ILibraryGateway {
  /**
   * @param libraries
   * @param medias
   */
  constructor(
    private readonly libraries: LibraryDomainModel.Library[] = [],
    private readonly medias: LibraryDomainModel.TiktokMedia[] = []
  ) {}

  createLibrary(
    libraryId: string,
    name: string,
    medias: LibraryDomainModel.TiktokMedia[] = []
  ): Promise<void> {
    return Promise.resolve();
  }

  renameLibrary(libraryId: string, newName: string): Promise<void> {
    return Promise.resolve();
  }

  deleteLibrary(libraryId: string): Promise<void> {
    return Promise.resolve();
  }

  addMedia(
    libraryId: string,
    searchId: string,
    mediaId: string
  ): Promise<void> {
    return Promise.resolve();
  }

  removeMedia(libraryId: string, mediaId: string): Promise<void> {
    return Promise.resolve();
  }

  reorderMedias(libraryId: string, newOrder: string[]): Promise<void> {
    return Promise.resolve();
  }

  getLibrary(libraryId: string): Promise<LibraryDomainModel.Library> {
    const lib = this.libraries.find((l) => l.id === libraryId);
    if (!lib) {
      return Promise.reject(
        new Error(`Library not found for id: ${libraryId}`)
      );
    }
    return Promise.resolve(lib);
  }

  getAllLibraries(): Promise<LibraryDomainModel.Library[]> {
    return Promise.resolve(this.libraries);
  }

  getMediaById(
    mediaId: string,
    libraryId: string
  ): Promise<LibraryDomainModel.TiktokMedia | undefined> {
    const lib = this.libraries.find((l) => l.id === libraryId);
    if (!lib) return Promise.resolve(undefined);
    const media = lib.medias.find((m) => m.id === mediaId);
    return Promise.resolve(media);
  }

  getLibraryAuthorMostViral(
    authorUsername: string,
    libraryId: string
  ): Promise<LibraryDomainModel.TiktokMedia[]> {
    return Promise.resolve([]);
  }
}
