// modules/dofus/core/usecase/add-item-to-character.usecase.ts
import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";

/**
 * Place un spell dans un slot (0..7) pour un characterId donné.
 * Usecase "UI/app" pur (pas de gateway).
 */
export type SlotIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const addItemToCharacter = createAppAsyncThunk<
  { characterId: string; slotIndex: SlotIndex; spell: CharacterDomainModel.Spell },
  { characterId: string; slotIndex: SlotIndex; spell: CharacterDomainModel.Spell }
>(
  "characterSlots/addItemToCharacter",
  async (payload) => payload
);
