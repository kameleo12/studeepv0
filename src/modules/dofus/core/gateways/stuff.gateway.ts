import { CharacterDomainModel } from "../model/stuff.domain-model";

export interface ICharactersGateway {
  searchByKeyword(keyword: string): Promise<{ searchId: string }>;
  getResults(searchId: string): Promise<CharacterDomainModel.Character[]>;
  getById(
    characterId: string,
    searchId: string
  ): Promise<CharacterDomainModel.Character | undefined>;
}
