import { ITiktokMediasGateway } from "@root/modules/search/core/gateways/tiktok-medias.gateway";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import axios, { AxiosInstance } from "axios";

export class HttpTiktokMediasGateway implements ITiktokMediasGateway {
  constructor(private readonly httpClient: AxiosInstance) {}

  async searchByUrl(videoId: string): Promise<SearchDomainModel.TiktokMedia[]> {
    const response = await this.httpClient.post("/search-by-link", {
      link: videoId,
    });

    return response.data;
  }

  async searchByKeyword(keyword: string): Promise<{ searchId: string }> {
    const response = await this.httpClient.post<{ searchId: string }>(
      "tiktok-search/search-by-query",
      {
        query: keyword,
      }
    );
    return response.data;
  }

  async getResults(searchId: string): Promise<SearchDomainModel.TiktokMedia[]> {
    const response = await this.httpClient.get<{
      results: SearchDomainModel.TiktokMedia[];
    }>(`/tiktok-search/get-search-results/${searchId}`);
    return response.data.results;
  }

  async getMediaById(
    mediaId: string,
    searchId: string
  ): Promise<SearchDomainModel.TiktokMedia | undefined> {
    const response = await this.httpClient.get<SearchDomainModel.TiktokMedia>(
      `/tiktok-search/get-media/${searchId}/${mediaId}`
    );
    return response.data;
  }

  async getAuthorMostViral(
    secUid: string
  ): Promise<SearchDomainModel.TiktokMedia[]> {
    try {
      const response = await this.httpClient.get<
        SearchDomainModel.TiktokMedia[]
      >(`/tiktok-search/get-author-most-viral/${secUid}`);
      return response.data;
    } catch (error) {
      console.error("getAuthorMostViral - Error:", error);
      throw error;
    }
  }

  async getQuerySuggestions(input: string): Promise<string[]> {
    if (!input.trim()) {
      return [];
    }
    const response = await this.httpClient.get<string[]>(
      `/tiktok-search/get-query-suggestions/${encodeURIComponent(input)}`
    );
    return response.data;
  }

  async getStarSearchResults(): Promise<SearchDomainModel.TiktokMedia[]> {
    const response = await this.httpClient.get<{
      results: SearchDomainModel.TiktokMedia[];
    }>("tiktok-search/get-star-search-results");
    return response.data.results;
  }

  async getStarMediaById(
    mediaId: string
  ): Promise<SearchDomainModel.TiktokMedia | undefined> {
    const response = await this.httpClient.get<SearchDomainModel.TiktokMedia>(
      `/tiktok-search/get-star-media/${mediaId}`
    );
    return response.data;
  }

  async GetMediaBlob(playUrl: string, cookie: string): Promise<Blob> {
    const response = await this.httpClient.get(
      `/tiktok-search/get-media-blob?playUrl=${encodeURIComponent(
        playUrl
      )}&cookie=${encodeURIComponent(cookie)}`,
      { responseType: "arraybuffer" }
    );
    return new Blob([response.data], { type: "video/mp4" });
  }
}
