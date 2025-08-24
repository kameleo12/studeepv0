// modules/dofus/core/usecase/add-item-to-character.usecase.ts
import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";

/**
 * Place un spell dans un slot (0..2) pour un characterId donné.
 * Usecase "UI/app" pur (pas de gateway).
 */
export const addItemToCharacter = createAppAsyncThunk<
  { characterId: string; slotIndex: 0 | 1 | 2; spell: CharacterDomainModel.Spell },
  { characterId: string; slotIndex: 0 | 1 | 2; spell: CharacterDomainModel.Spell }
>(
  "characterSlots/addItemToCharacter",
  async (payload) => {
    // Pas d’I/O : on retourne simplement le payload pour le reducer.
    return payload;
  }
);
