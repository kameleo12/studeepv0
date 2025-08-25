// modules/dofus/react/search/hooks/use-search-results.hook.ts
import { useSelector, shallowEqual } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";

type CharacterSearchVM = {
  characters: CharacterDomainModel.Character[];
  hasStarted: boolean;
  isLoading: boolean;
  searchId: string;
};

const fallback: CharacterSearchVM = {
  characters: [],
  hasStarted: false,
  isLoading: false,
  searchId: "",
};

const selectDofusSlice = (state: AppState) => state.charactersSearching;

const selectCharacterSearchResults = createSelector(
  [selectDofusSlice],
  (s): CharacterSearchVM =>
    s
      ? {
          characters: s.results as CharacterDomainModel.Character[],
          hasStarted: !!s.started,
          isLoading: !!s.loading,
          searchId: s.searchId ?? "",
        }
      : fallback
);

export const useSearchResultsCharacter = () =>
  useSelector(selectCharacterSearchResults, shallowEqual);
