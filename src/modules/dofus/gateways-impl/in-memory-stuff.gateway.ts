import { ICharactersGateway } from "../core/gateways/stuff.gateway";
import { CharacterDomainModel } from "../core/model/stuff.domain-model";
import { CharacterFactory } from "../core/model/stuff.factory";
import { wait } from "../../shared/utils/wait.utils";

export class InMemoryCharactersGateway implements ICharactersGateway {
  private lastQuery = "";

  async searchByKeyword(query: string): Promise<{ searchId: string }> {
    this.lastQuery = (query ?? "").trim().toLowerCase();
    return { searchId: "search-id" };
  }

  async getResults(
    searchId: string
  ): Promise<CharacterDomainModel.Character[]> {
    await wait(3000);

    const q = this.lastQuery;
    if (!q) return this.characters;

    return this.characters.filter((c) => {
      const inName = c.name.toLowerCase().includes(q);
      const inSpells = c.spells.some((s) => s.name.toLowerCase().includes(q));
      return inName || inSpells;
    });
  }

  async getById(
    characterId: string,
    _searchId: string
  ): Promise<CharacterDomainModel.Character | undefined> {
    return this.characters.find((c) => c.id === characterId);
  }

  // --- Données en mémoire ---
  private readonly characters: CharacterDomainModel.Character[] = [
    CharacterFactory.create({
      id: "1",
      name: "Iop",
      thumbnail: "https://picsum.photos/seed/iop/200/300",
      spells: [
        { id: "iop_1", name: "Pressure" },
        { id: "iop_2", name: "Intimidation" },
        { id: "iop_3", name: "Jump" },
      ],
    }),
    CharacterFactory.create({
      id: "2",
      name: "Cra",
      thumbnail: "https://picsum.photos/seed/cra/200/300",
      spells: [
        { id: "cra_1", name: "Magic Arrow" },
        { id: "cra_2", name: "Frost Arrow" },
        { id: "cra_3", name: "Retreat Arrow" },
      ],
    }),
    CharacterFactory.create({
      id: "3",
      name: "Eniripsa",
      thumbnail: "https://picsum.photos/seed/eniripsa/200/300",
      spells: [
        { id: "eni_1", name: "Word of Recovery" },
        { id: "eni_2", name: "Stimulating Word" },
      ],
    }),
  ];
}
