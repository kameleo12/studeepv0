// @root/modules/search/react/hooks/use-search-results-stuff.hook.ts
import { useSelector } from "react-redux";
import { AppState } from "@root/modules/store/app-state";

const selectStuffSearchResults = (state: AppState) => {
  const s = state.stuffsSearching;
  return {
    stuffs: s.results,
    hasStarted: s.started,
    isLoading: s.loading,
    searchId: s.searchId,
  };
};

export const useSearchResultsStuff = () => {
  const baseSearchResults = useSelector(selectStuffSearchResults);

  return {
    stuffs: baseSearchResults.stuffs,
    hasStarted: baseSearchResults.hasStarted,
    isLoading: baseSearchResults.isLoading,
    searchId: baseSearchResults.searchId,
  };
};
