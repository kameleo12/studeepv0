import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AppState } from "../../../../store/app-state";

export const useSearchBarCharacter = ({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) => {
  const globalQuery = useSelector(
    (state: AppState) => state.charactersSearching.query
  );

  const [query, setQuery] = useState(globalQuery);
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (globalQuery !== query) {
      setQuery(globalQuery);
    }
  }, [globalQuery]);

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

  return {
    query,
    setQuery,
    handleSubmit,
  };
};
