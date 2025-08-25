// modules/store/app-state.ts
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";

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

export interface AppState {
  charactersSearching: {
    results: CharacterDomainModel.Character[];
    query: string;
    loading: boolean;
    started: boolean;
    searchId: string;
  };
  currentCharacter: {
    character: CharacterDomainModel.Character | null;
    loading: boolean;
  };

  characterSlots: {
    /** Clé = characterId ; valeur = 8 slots stricts */
    byCharacterId: Record<string, SlotsTuple8>;
  };

    lolItemsSearching: {
    results: ItemDomainModel.Item[];
    query: string;
    loading: boolean;
    started: boolean;
    searchId: string;
  };
  currentLolItem: {
    item: ItemDomainModel.Item | null;
    loading: boolean;
  };

}

