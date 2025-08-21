import { StuffDomainModel } from "../model/stuff.domain-model";

export interface IStuffsGateway {
   searchByKeyword(keyword: string): Promise<{ searchId: string }>;
    getResults(searchId: string): Promise<StuffDomainModel.Stuff[]>;
  getById(
    stuffId: string,
    searchId: string
  ): Promise<StuffDomainModel.Stuff | undefined>;
}
