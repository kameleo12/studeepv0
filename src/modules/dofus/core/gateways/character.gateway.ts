import { CharacterDomainModel } from "../model/character.domain-model";

export interface ICharactersGateway {
  searchByKeyword(keyword: string): Promise<{ searchId: string }>;
  getResults(searchId: string): Promise<CharacterDomainModel.Character[]>;
  getById(
    characterId: string,
    searchId: string
  ): Promise<CharacterDomainModel.Character | undefined>;
}
