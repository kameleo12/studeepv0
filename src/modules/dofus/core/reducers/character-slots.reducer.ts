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
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null,
  CharacterDomainModel.Spell | null
];

const emptySlots = (): SlotsTuple => [null, null, null, null, null, null, null, null];

export const characterSlotsReducer = createReducer<AppState["characterSlots"]>(
  { byCharacterId: {} },
  (builder) => {
    builder.addCase(getCharacterById.fulfilled, (state, action) => {
      const character = action.payload;
      if (!character) return;
      if (!state.byCharacterId[character.id]) {
        state.byCharacterId[character.id] = emptySlots();
      }
    });

    builder.addCase(addItemToCharacter.fulfilled, (state, action) => {
      const { characterId, slotIndex, spell } = action.payload as {
        characterId: string;
        slotIndex: number; // ⚠️ pense à updater le type dans le usecase
        spell: CharacterDomainModel.Spell;
      };
      const slots = (state.byCharacterId[characterId] ??= emptySlots());

      // Anti-duplicate : libère l'ancien slot si même spell déjà présent
      const existingIndex = slots.findIndex((s) => s?.id === spell.id);
      if (existingIndex !== -1 && existingIndex !== slotIndex) {
        slots[existingIndex] = null;
      }

      if (slotIndex >= 0 && slotIndex < slots.length) {
        slots[slotIndex] = spell;
      }
    });

    builder.addCase(resetItem.fulfilled, (state, action) => {
      const { characterId, slotIndex } = action.payload as {
        characterId: string;
        slotIndex: number; // ⚠️ pense à updater le type dans le usecase
      };
      const slots = (state.byCharacterId[characterId] ??= emptySlots());
      if (slotIndex >= 0 && slotIndex < slots.length) {
        slots[slotIndex] = null;
      }
    });
  }
);
