import { CharacterDomainModel } from "./stuff.domain-model";

export class CharacterFactory {
  static create(
    overrides: Partial<CharacterDomainModel.Character> = {}
  ): CharacterDomainModel.Character {
    return {
      id: "1",
      name: "Iop",
      thumbnail: "https://picsum.photos/seed/iop/200/300",
      spells: [
        { id: "iop_1", name: "Pressure" },
        { id: "iop_2", name: "Intimidation" },
        { id: "iop_3", name: "Jump" },
      ],
      ...overrides,
    };
  }
}
