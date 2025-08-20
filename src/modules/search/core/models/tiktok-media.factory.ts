import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import dayjs from "dayjs";

export class TiktokMediaFactory {
  static create(
    overrides: Partial<SearchDomainModel.TiktokMedia>
  ): SearchDomainModel.TiktokMedia {
    return {
      id: "1",
      description: "description",
      author: {
        username: "username",
        followersCount: 1_000_000,
        secUid: "secUid1",
      },
      thumbnail: "thumbnail",
      duration: 1,
      viralScore: 1,
      viewsCount: 1,
      playUrl: "https://www.example.com/video.mp4",
      likesCount: 1,
      uploadedAt: dayjs().subtract(6, "months").toISOString(),
      cookie: "cookie",
      ...overrides,
    };
  }
}
