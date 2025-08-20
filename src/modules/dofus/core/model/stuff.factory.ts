import { StuffDomainModel } from "./stuff.domain-model";
import dayjs from "dayjs";

export class StuffFactory {
  static create(
    overrides: Partial<StuffDomainModel.Stuff> = {}
  ): StuffDomainModel.Stuff {
    return {
      id: "1",
      uploadedAt: dayjs().subtract(6, "months").toISOString(),
      thumbnail: "thumbnail",
      power: 42,
      items: {
        thumbnail: "item-thumbnail",
        power: 10,
        health: 100,
        description: "A sample item",
      },
      ...overrides,
    };
  }
}
