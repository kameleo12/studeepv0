import { addItemToCharacter } from "./add-item-to-character.usecase";
import { createTestStore } from "../../../testing/tests-environment";

import { createCharacterFixture } from "@root/modules/dofus/core/testing/character.fixture";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";

describe("Add item to character (slots)", () => {
  let store: AppStore;
  let dispatch: AppDispatch;

  let char1: CharacterDomainModel.Character;

  beforeEach(() => {
    // Character avec quelques sorts
    char1 = createCharacterFixture({ id: "c-1" });

    store = createTestStore({
      initialState: createInitialState({
        charactersSearching: {
          results: [char1],
          query: "q",
          loading: false,
          started: true,
          searchId: "search-id",
        },
        currentCharacter: {
          character: char1,
          loading: false,
        },
        // Pas besoin d’amorcer characterSlots : le reducer crée la structure au besoin
      }),
      dependencies: {
        // aucun gateway requis pour ces usecases purement UI
      } as any,
    });

    dispatch = store.dispatch;
  });

  it("should put a spell into the requested slot (initialize state if needed)", async () => {
    const spell = char1.spells[0]; // CharacterDomainModel.Spell
    const slotIndex = 0 as 0 | 1 | 2;

    await dispatch(
      addItemToCharacter({
        characterId: char1.id,
        slotIndex,
        spell,
      })
    );

    const slots = store.getState().characterSlots.byCharacterId[char1.id];
    expect(slots).toBeDefined();
    expect(slots[slotIndex]).toEqual(spell);
    // les autres slots restent vides
    expect(slots[1]).toBeNull();
    expect(slots[2]).toBeNull();
  });

  it("should replace an existing spell when adding to the same slot again", async () => {
    const spellA = char1.spells[0];
    const spellB = char1.spells[1];
    const slotIndex = 1 as 0 | 1 | 2;

    await dispatch(addItemToCharacter({ characterId: char1.id, slotIndex, spell: spellA }));
    await dispatch(addItemToCharacter({ characterId: char1.id, slotIndex, spell: spellB }));

    const slots = store.getState().characterSlots.byCharacterId[char1.id];
    expect(slots[slotIndex]).toEqual(spellB);
  });
});
