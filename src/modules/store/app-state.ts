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
}
