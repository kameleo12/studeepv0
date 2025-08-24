// modules/store/app-state.ts
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";

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

    byCharacterId: Record<
      string,
      [CharacterDomainModel.Spell | null, CharacterDomainModel.Spell | null, CharacterDomainModel.Spell | null]
    >;
  };
}
