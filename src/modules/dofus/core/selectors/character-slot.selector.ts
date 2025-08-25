
import { AppState } from "@root/modules/store/app-state";
import { CharacterDomainModel } from "../model/character.domain-model";


export type SlotsTuple8 = [
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null
];

const EMPTY_8: SlotsTuple8 = [null, null, null, null, null, null, null, null];

export const selectCharacterSlots = (
  state: AppState,
  characterId: string
): SlotsTuple8 => {
  return (state.characterSlots.byCharacterId[characterId] ?? EMPTY_8) as SlotsTuple8;
};
