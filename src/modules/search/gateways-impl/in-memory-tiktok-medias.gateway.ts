import { ITiktokMediasGateway } from "@root/modules/search/core/gateways/tiktok-medias.gateway";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { TiktokAuthorFactory } from "@root/modules/search/core/models/tiktok-author.factory";
import { TiktokMediaFactory } from "@root/modules/search/core/models/tiktok-media.factory";
import { wait } from "@root/modules/shared/utils/wait.utils";
import dayjs from "dayjs";

export class InMemoryTiktokMediasGateway implements ITiktokMediasGateway {
  async searchByKeyword(query: string): Promise<{ searchId: string }> {
    return { searchId: "search-id" };
  }

  async getResults(searchId: string): Promise<SearchDomainModel.TiktokMedia[]> {
    await wait(3000);
    return this.tiktokMedias;
  }

  async getStarSearchResults(): Promise<SearchDomainModel.TiktokMedia[]> {
    await wait(3000);
    return this.tiktokMedias;
  }

  async getMediaById(
    mediaId: string,
    searchId: string
  ): Promise<SearchDomainModel.TiktokMedia | undefined> {
    return this.tiktokMedias.find((media) => media.id === mediaId);
  }

  async getStarMediaById(
    mediaId: string
  ): Promise<SearchDomainModel.TiktokMedia | undefined> {
    return this.tiktokMedias.find((media) => media.id === mediaId);
  }

  async getAuthorMostViral(
    secUid: string
  ): Promise<SearchDomainModel.TiktokMedia[]> {
    await wait(3000);
    return this.tiktokMedias
      .filter((media) => media.author.secUid === secUid)
      .sort((a, b) => b.viralScore - a.viralScore)
      .slice(0, 5);
  }

  async getQuerySuggestions(input: string): Promise<string[]> {
    await wait(500);

    if (!input.trim()) {
      return [];
    }
    const lowerInput = input.toLowerCase();
    const descriptions = Array.from(
      new Set(this.tiktokMedias.map((m) => m.description.toLowerCase()))
    );
    const matched = descriptions.filter((d) => d.includes(lowerInput));

    return matched.slice(0, 6).map((s) => s.toUpperCase());
  }

  async GetMediaBlob(playUrl: string, cookie: string): Promise<Blob> {
    const media = this.tiktokMedias.find((m) => m.playUrl === playUrl);
    if (!media) {
      throw new Error(`Media ${playUrl} not found`);
    }
    return new Blob([`fake video data for media ${playUrl}`], {
      type: "video/mp4",
    });
  }

  private readonly tiktokMedias: SearchDomainModel.TiktokMedia[] = [
    TiktokMediaFactory.create({
      id: "1",
      description: "FIRST single rail montain coaster....",
      viralScore: 84,
      likesCount: 38990,
      uploadedAt: dayjs().subtract(6, "months").toISOString(),
      thumbnail: "https://picsum.photos/200/300",
      playUrl: "https://www.example.com/video1.mp4",
      author: TiktokAuthorFactory.create({ username: "Alex Ojeda" }),
    }),
    TiktokMediaFactory.create({
      id: "2",
      description: "SECOND single rail snow coaster....",
      viralScore: 70,
      likesCount: 1234,
      uploadedAt: dayjs().subtract(2, "months").toISOString(),
      thumbnail: "https://picsum.photos/200/300",
      playUrl: "https://www.example.com/video1.mp4",
      author: TiktokAuthorFactory.create({ username: "John Doe" }),
    }),
    TiktokMediaFactory.create({
      id: "3",
      description: "THIRD single rail snow coaster....",
      viralScore: 80,
      likesCount: 89098,
      uploadedAt: dayjs().subtract(2, "months").toISOString(),
      thumbnail: "https://picsum.photos/200/300",
      playUrl: "https://www.example.com/video1.mp4",
      author: TiktokAuthorFactory.create({ username: "John Doe" }),
    }),
    TiktokMediaFactory.create({
      id: "4",
      description: "FOURTH single rail snow coaster....",
      viralScore: 60,
      likesCount: 300,
      uploadedAt: dayjs().subtract(1, "month").toISOString(),
      thumbnail: "https://picsum.photos/200/300",
      playUrl: "https://www.example.com/video1.mp4",
      author: TiktokAuthorFactory.create({ username: "John Doe" }),
    }),
    TiktokMediaFactory.create({
      id: "5",
      description: "FIFTH single rail snow coaster....",
      viralScore: 99,
      likesCount: 1234,
      uploadedAt: dayjs().subtract(7, "month").toISOString(),
      thumbnail: "https://picsum.photos/200/300",
      playUrl: "https://www.example.com/video1.mp4",
      author: TiktokAuthorFactory.create({ username: "John Doe" }),
    }),
    TiktokMediaFactory.create({
      id: "6",
      description: "SIXTH single rail snow coaster....",
      viralScore: 100,
      likesCount: 2893,
      uploadedAt: dayjs().subtract(2, "month").toISOString(),
      thumbnail: "https://picsum.photos/200/300",
      playUrl: "https://www.example.com/video1.mp4",
      author: TiktokAuthorFactory.create({ username: "John Doe" }),
    }),
  ];
}
