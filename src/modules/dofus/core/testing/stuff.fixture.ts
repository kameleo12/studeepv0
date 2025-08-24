import { CharacterDomainModel } from "../model/stuff.domain-model";
import { CharacterFactory } from "../model/stuff.factory";

export const createCharacterFixture = (
  overrides: Partial<CharacterDomainModel.Character> = {}
): CharacterDomainModel.Character => {
  return CharacterFactory.create(overrides);
};
