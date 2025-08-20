import { selectStarSearchResults } from "@root/modules/search/core/selectors/star-search-results.selector";
import { useSelector } from "react-redux";

export const useStarSearchResults = () => {
  const starSearchResults = useSelector(selectStarSearchResults);
  const { hasStarted, isLoading, medias } = starSearchResults;
  return { medias, hasStarted, isLoading };
};
