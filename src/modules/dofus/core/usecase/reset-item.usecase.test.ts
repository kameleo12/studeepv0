import { resetItem } from "./reset-item.usecase";
import { addItemToCharacter } from "./add-item-to-character.usecase";
import { createTestStore } from "../../../testing/tests-environment";

import { createCharacterFixture } from "@root/modules/dofus/core/testing/character.fixture";
import { AppStore, AppDispatch } from "@root/modules/store/store";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";

describe("Reset item (slot) for a character", () => {
  let store: AppStore;
  let dispatch: AppDispatch;
  let char1: CharacterDomainModel.Character;

  beforeEach(() => {
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
      }),
      dependencies: {} as any,
    });

    dispatch = store.dispatch;
  });

  it("should set the targeted slot to null", async () => {
    const slotIndex = 2 as 0 | 1 | 2;
    const spell = char1.spells[0];

    // Pré-remplir le slot
    await dispatch(addItemToCharacter({ characterId: char1.id, slotIndex, spell }));
    expect(store.getState().characterSlots.byCharacterId[char1.id][slotIndex]).toEqual(spell);

    // Reset
    await dispatch(resetItem({ characterId: char1.id, slotIndex }));

    const slots = store.getState().characterSlots.byCharacterId[char1.id];
    expect(slots[slotIndex]).toBeNull();
  });

  it("should initialize empty slots if state absent, then reset keeps it null", async () => {
    const slotIndex = 0 as 0 | 1 | 2;

    // Aucun set préalable : le reducer crée les slots à la volée
    await dispatch(resetItem({ characterId: char1.id, slotIndex }));

    const slots = store.getState().characterSlots.byCharacterId[char1.id];
    expect(slots).toEqual([null, null, null]);
  });
});
