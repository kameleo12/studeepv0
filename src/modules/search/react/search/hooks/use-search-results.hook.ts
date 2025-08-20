import { useSelector } from "react-redux";
import { selectTiktokSearchResults } from "@root/modules/search/core/selectors/search-results.selector";

export const useSearchResults = () => {
  const baseSearchResults = useSelector(selectTiktokSearchResults);

  return {
    medias: baseSearchResults.medias,
    hasStarted: baseSearchResults.hasStarted,
    isLoading: baseSearchResults.isLoading,
    searchId: baseSearchResults.searchId,
  };
};
