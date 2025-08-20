import { ITiktokMediasGateway } from "@root/modules/search/core/gateways/tiktok-medias.gateway";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export class StubTiktokMediasGateway implements ITiktokMediasGateway {
  constructor(
    private readonly searchId: string = "1",
    private readonly results: SearchDomainModel.TiktokMedia[] = [],
    private readonly suggestions: string[] = []
  ) {}


  async getMediaById(
    mediaId: string,
    searchId: string
  ): Promise<SearchDomainModel.TiktokMedia | undefined> {
    return this.results.find((media) => media.id === mediaId);
  }

}
