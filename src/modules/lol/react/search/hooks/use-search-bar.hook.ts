// @root/modules/search/react/hooks/use-search-bar-stuff.hook.ts
import { useSelector } from "react-redux";
import { useAppDispatch } from "@root/modules/store/store";
import { useState, useEffect } from "react";
import { AppState } from "@root/modules/store/app-state";

export const useSearchBarStuff = ({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) => {
  const globalQuery = useSelector(
    (state: AppState) => state.stuffsSearching.query
  );

  const [query, setQuery] = useState(globalQuery);

  useEffect(() => {
    setQuery(globalQuery);
  }, [globalQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return {
    query,
    setQuery,
    handleSubmit,
    handleQueryChange,
  };
};
