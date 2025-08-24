import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { CharacterFactory } from "@root/modules/dofus/core/model/character.factory";

export const createCharacterFixture = (
  overrides: Partial<CharacterDomainModel.Character> = {}
): CharacterDomainModel.Character => {
  return CharacterFactory.create(overrides);
};
