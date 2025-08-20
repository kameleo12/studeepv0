import { useEffect, useState } from "react";
import { selectTiktokSearchResults } from "@root/modules/search/core/selectors/search-results.selector";
import { searchTiktokMedias } from "@root/modules/search/core/usecases/search-settings/search-tiktok-medias.usecase";
import { useAppDispatch } from "@root/modules/store/store";
import { useSelector } from "react-redux";
import { getResults } from "@root/modules/search/core/usecases/search-results/get-results.usecase";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const searchResults = useSelector(selectTiktokSearchResults);

  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      dispatch(searchTiktokMedias({ query }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, dispatch]);

  useEffect(() => {
    if (searchResults.isLoading && searchResults.searchId) {
      let interval = setInterval(() => {
        dispatch(getResults({ searchId: searchResults.searchId }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [searchResults.isLoading, searchResults.searchId, dispatch]);

  const onSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return { searchResults, onSearch };
};
