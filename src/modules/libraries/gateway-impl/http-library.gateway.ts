import { ILibraryGateway } from "../core/gateways/library.gateway";
import { LibraryDomainModel } from "../core/models/library.domain-model";
import axios, { AxiosInstance } from "axios";

export class HttpLibraryGateway implements ILibraryGateway {
  constructor(private readonly httpClient: AxiosInstance) {}

  async createLibrary(
    libraryId: string,
    name: string,
    medias: LibraryDomainModel.TiktokMedia[] = []
  ): Promise<void> {
    await this.httpClient.post("/libraries", {
      libraryId,
      name,
      medias,
    });
  }

  async renameLibrary(libraryId: string, newName: string): Promise<void> {
    await this.httpClient.patch(`/libraries/${libraryId}/rename`, { newName });
  }

  async deleteLibrary(libraryId: string): Promise<void> {
    await this.httpClient.delete(`/libraries/${libraryId}`);
  }

  async addMedia(
    libraryId: string,
    searchId: string,
    mediaId: string
  ): Promise<void> {
    await this.httpClient.post(`/libraries/${libraryId}/media`, {
      searchId,
      mediaId,
    });
  }

  async removeMedia(libraryId: string, mediaId: string): Promise<void> {
    await this.httpClient.delete(`/libraries/${libraryId}/media/${mediaId}`);
  }

  async reorderMedias(libraryId: string, newOrder: string[]): Promise<void> {
    await this.httpClient.patch(`/libraries/${libraryId}/reorder`, {
      newOrder,
    });
  }

  async getLibrary(libraryId: string): Promise<LibraryDomainModel.Library> {
    const response = await this.httpClient.get<LibraryDomainModel.Library>(
      `/libraries/${libraryId}`
    );
    return response.data;
  }

  async getAllLibraries(): Promise<LibraryDomainModel.Library[]> {
    const response = await this.httpClient.get<LibraryDomainModel.Library[]>(
      "/libraries"
    );
    return response.data;
  }

  async getMediaById(
    mediaId: string,
    libraryId: string
  ): Promise<LibraryDomainModel.TiktokMedia | undefined> {
    const response = await this.httpClient.get<LibraryDomainModel.TiktokMedia>(
      `/libraries/get-media/${libraryId}/${mediaId}`
    );
    return response.data;
  }
}
