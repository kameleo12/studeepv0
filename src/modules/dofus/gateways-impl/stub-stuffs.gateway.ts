// @root/modules/search/gateways-impl/stub-stuffs.gateway.ts
import { IStuffsGateway } from "../core/gateways/stuff.gateway";
import { StuffDomainModel } from "../core/model/stuff.domain-model";

export class StubStuffsGateway implements IStuffsGateway {
  constructor(
    private readonly searchId: string = "1",
    private readonly results: StuffDomainModel.Stuff[] = []
  ) {}

  async searchByKeyword(keyword: string): Promise<{ searchId: string }> {
    return { searchId: this.searchId };
  }

    async getResults(searchId: string): Promise<StuffDomainModel.Stuff[]> {
    return this.results;
  }

  async getById(
    stuffId: string,
    searchId: string
  ): Promise<StuffDomainModel.Stuff | undefined> {
    if (searchId !== this.searchId) return undefined;
    return this.results.find((s) => s.id === stuffId);
  }
}

