import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AppState } from "@root/modules/store/app-state";

export const useSearchBarItems = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const globalQuery = useSelector((state: AppState) => state.lolItemsSearching.query);

  const [query, setQuery] = useState(globalQuery);
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (globalQuery !== query) setQuery(globalQuery);
  }, [globalQuery, query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchRef.current(query);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchRef.current(query);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  return { query, setQuery, handleSubmit };
};
