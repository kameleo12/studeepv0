// modules/dofus/core/reducers/character-slots.reducer.ts
import { createReducer } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import { addItemToCharacter } from "../usecase/add-item-to-character.usecase";
import { resetItem } from "../usecase/reset-item.usecase";
import { getCharacterById } from "../usecase/get-character-by-id.usecase";
import { CharacterDomainModel } from "../model/character.domain-model";

type SlotsTuple = [
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null
];

const emptySlots = (): SlotsTuple => [null, null, null];

export const characterSlotsReducer = createReducer<AppState["characterSlots"]>(
  {
    byCharacterId: {},
  },
  (builder) => {
    // À l’ouverture d’une fiche, s’assurer que les slots existent
    builder.addCase(getCharacterById.fulfilled, (state, action) => {
      const character = action.payload;
      if (!character) return;
      if (!state.byCharacterId[character.id]) {
        state.byCharacterId[character.id] = emptySlots();
      }
    });

    // Ajouter/remplacer un spell dans un slot
    builder.addCase(addItemToCharacter.fulfilled, (state, action) => {
      const { characterId, slotIndex, spell } = action.payload;
      if (!state.byCharacterId[characterId]) {
        state.byCharacterId[characterId] = emptySlots();
      }
      state.byCharacterId[characterId][slotIndex] = spell;
    });

    // Vider un slot
    builder.addCase(resetItem.fulfilled, (state, action) => {
      const { characterId, slotIndex } = action.payload;
      if (!state.byCharacterId[characterId]) {
        state.byCharacterId[characterId] = emptySlots();
      }
      state.byCharacterId[characterId][slotIndex] = null;
    });
  }
);
