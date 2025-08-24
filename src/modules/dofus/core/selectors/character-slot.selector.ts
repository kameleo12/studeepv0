// modules/dofus/core/selectors/character-slots.selectors.ts
import { AppState } from "@root/modules/store/app-state";
import { CharacterDomainModel } from "../model/character.domain-model";

type SlotsTuple = [
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null
];

export const selectCharacterSlots = (state: AppState, characterId: string): SlotsTuple => {
  return (
    state.characterSlots.byCharacterId[characterId] ?? [null, null, null]
  ) as SlotsTuple;
};
