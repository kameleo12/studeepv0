import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export interface ITiktokMediasGateway {
  searchByKeyword(keyword: string): Promise<{ searchId: string }>;

  getResults(searchId: string): Promise<SearchDomainModel.TiktokMedia[]>;

  getMediaById(
    mediaId: string,
    searchId: string
  ): Promise<SearchDomainModel.TiktokMedia | undefined>;

  getAuthorMostViral(secUid: string): Promise<SearchDomainModel.TiktokMedia[]>;

  getStarSearchResults(): Promise<SearchDomainModel.TiktokMedia[]>;

  getStarMediaById(
    mediaId: string
  ): Promise<SearchDomainModel.TiktokMedia | undefined>;

  getQuerySuggestions(input: string): Promise<string[]>;

  GetMediaBlob(playUrl: string, cookie: string): Promise<Blob | MediaSource>;
}
