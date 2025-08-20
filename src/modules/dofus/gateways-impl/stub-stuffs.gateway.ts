// @root/modules/search/gateways-impl/stub-stuffs.gateway.ts
import { IStuffsGateway } from "../core/gateways/stuff.gateway";
import { StuffDomainModel } from "../core/model/stuff.domain-model";

export class StubStuffsGateway implements IStuffsGateway {
  constructor(
    private readonly searchId: string = "1",
    private readonly results: StuffDomainModel.Stuff[] = [],
  ) {}

  async getById(
    stuffId: string,
    searchId: string
  ): Promise<StuffDomainModel.Stuff | undefined> {
    return this.results.find((s) => s.id === stuffId);
  }
}
