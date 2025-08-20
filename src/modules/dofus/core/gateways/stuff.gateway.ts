import { StuffDomainModel } from "../model/stuff.domain-model";

export interface IStuffsGateway {
  getById(
    stuffId: string,
    searchId: string
  ): Promise<StuffDomainModel.Stuff | undefined>;
}
