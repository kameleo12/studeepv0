export namespace SearchDomainModel {
  export type TiktokMedia = {
    id: string;
    description: string;
    author: TiktokAuthor;
    thumbnail: string;
    duration: number;
    likesCount: number;
    viralScore: number;
    uploadedAt: string;
    viewsCount: number;
    playUrl: string;
    cookie: string;
    blobUrl?: string;
  };

  export type TiktokAuthor = {
    username: string;
    followersCount: number;
    secUid: string;
  };

  export enum SearchType {
    KEYWORD = "KEYWORD",
    TIKTOK_URL = "TIKTOK_URL",
  }

  export type SortOptions = "viewsCount" | "viralScore";
}
