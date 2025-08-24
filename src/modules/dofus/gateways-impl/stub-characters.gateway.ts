import { ICharactersGateway } from "@root/modules/dofus/core/gateways/character.gateway";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";


export class StubCharactersGateway implements ICharactersGateway {
  constructor(
    private readonly searchId: string = "1",
    private readonly results: CharacterDomainModel.Character[] = []
  ) {}

  async searchByKeyword(_keyword: string): Promise<{ searchId: string }> {
    return { searchId: this.searchId };
  }

  async getResults(
    _searchId: string
  ): Promise<CharacterDomainModel.Character[]> {
    return this.results;
  }

  async getById(
    characterId: string,
    searchId: string
  ): Promise<CharacterDomainModel.Character | undefined> {
    if (searchId !== this.searchId) return undefined;
    return this.results.find((c) => c.id === characterId);
  }
}
