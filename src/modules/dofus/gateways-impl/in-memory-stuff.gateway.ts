// @root/modules/search/gateways-impl/in-memory-stuff.gateway.ts
import { IStuffsGateway } from "../core/gateways/stuff.gateway";
import { StuffDomainModel } from "../core/model/stuff.domain-model";
import { StuffFactory } from "../core/model/stuff.factory";
import { wait } from "@root/modules/shared/utils/wait.utils";
import dayjs from "dayjs";

export class InMemoryStuffsGateway implements IStuffsGateway {
  private lastQuery = "";

  async searchByKeyword(query: string): Promise<{ searchId: string }> {
    // on mémorise la query pour que getResults puisse filtrer
    this.lastQuery = (query ?? "").trim().toLowerCase();
    return { searchId: "search-id" };
  }

  async getResults(searchId: string): Promise<StuffDomainModel.Stuff[]> {
    await wait(3000);

    // Filtrage très simple basé sur la description des items
    const q = this.lastQuery;
    if (!q) return this.stuffs;

    return this.stuffs.filter((s) => {
      const desc = s.items.description?.toLowerCase() ?? "";
      return desc.includes(q);
    });
  }

  async getById(
    stuffId: string,
    searchId: string
  ): Promise<StuffDomainModel.Stuff | undefined> {
    // même philosophie que le stub TikTok : on ignore searchId dans le stub
    return this.stuffs.find((s) => s.id === stuffId);
  }

  // --- Données en mémoire : compatibles avec SearchDomainModel.Stuff ---

  private readonly stuffs: StuffDomainModel.Stuff[] = [
    StuffFactory.create({
      id: "1",
      uploadedAt: dayjs().subtract(6, "months").toISOString(),
      thumbnail: "https://picsum.photos/seed/stuff1/200/300",
      power: 84,
      items: {
        thumbnail: "https://picsum.photos/seed/stuff1-item/200/300",
        power: 18,
        health: 92,
        description: "FIRST single rail mountain module with great handling",
      },
    }),
    StuffFactory.create({
      id: "2",
      uploadedAt: dayjs().subtract(2, "months").toISOString(),
      thumbnail: "https://picsum.photos/seed/stuff2/200/300",
      power: 70,
      items: {
        thumbnail: "https://picsum.photos/seed/stuff2-item/200/300",
        power: 12,
        health: 88,
        description: "SECOND snow module optimized for cold environments",
      },
    }),
    StuffFactory.create({
      id: "3",
      uploadedAt: dayjs().subtract(2, "months").toISOString(),
      thumbnail: "https://picsum.photos/seed/stuff3/200/300",
      power: 80,
      items: {
        thumbnail: "https://picsum.photos/seed/stuff3-item/200/300",
        power: 20,
        health: 95,
        description: "THIRD snow module with reinforced chassis",
      },
    }),
    StuffFactory.create({
      id: "4",
      uploadedAt: dayjs().subtract(1, "month").toISOString(),
      thumbnail: "https://picsum.photos/seed/stuff4/200/300",
      power: 60,
      items: {
        thumbnail: "https://picsum.photos/seed/stuff4-item/200/300",
        power: 9,
        health: 76,
        description: "FOURTH compact module suitable for tight tracks",
      },
    }),
    StuffFactory.create({
      id: "5",
      uploadedAt: dayjs().subtract(7, "months").toISOString(),
      thumbnail: "https://picsum.photos/seed/stuff5/200/300",
      power: 99,
      items: {
        thumbnail: "https://picsum.photos/seed/stuff5-item/200/300",
        power: 25,
        health: 98,
        description: "FIFTH high-power module for steep climbs",
      },
    }),
    StuffFactory.create({
      id: "6",
      uploadedAt: dayjs().subtract(2, "months").toISOString(),
      thumbnail: "https://picsum.photos/seed/stuff6/200/300",
      power: 100,
      items: {
        thumbnail: "https://picsum.photos/seed/stuff6-item/200/300",
        power: 30,
        health: 90,
        description: "SIXTH performance module tuned for speed",
      },
    }),
  ];
}
