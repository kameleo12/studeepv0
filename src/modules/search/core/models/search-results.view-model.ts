export namespace SearchResultsVM {
  export type Display = {
    searchId: string;
    hasStarted: boolean;
    isLoading: boolean;
    medias: TiktokMedia[];
  };

  export type TiktokMedia = {
    id: string;
    description: string;
    viralScore: number;
    likesCount: string;
    uploadedAt: string;
    viralScoreColor: "red" | "orange" | "green" | "gold";
    thumbnailUrl: string;
    viewsCount: number;
    followersCount: string;
    secUid: string;
    playUrl: string;
    duration: string;
    author: string;
    cookie: string;
    blobUrl?: string;
  };
}
