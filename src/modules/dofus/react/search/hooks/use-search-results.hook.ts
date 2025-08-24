import { useSelector } from "react-redux";
import { AppState } from "../../../../store/app-state";

const selectCharacterSearchResults = (state: AppState) => {
  const s = state.charactersSearching;
  return {
    characters: s.results,
    hasStarted: s.started,
    isLoading: s.loading,
    searchId: s.searchId,
  };
};

export const useSearchResultsCharacter = () => {
  return useSelector(selectCharacterSearchResults);
};
