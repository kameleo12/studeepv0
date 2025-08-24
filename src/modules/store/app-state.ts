import { CharacterDomainModel } from "../dofus/core/model/stuff.domain-model";

export interface AppState {
  currentStuff: any;
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
