// @root/modules/search/react/hooks/use-search-bar-stuff.hook.ts
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
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

  // Garder une ref vers la dernière version de onSearch pour éviter
  // que l'effet debounce se réinitialise à cause des changements d'identité.
  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Ne resynchroniser que si la valeur diffère (évite d'écraser la frappe locale)
  useEffect(() => {
    if (globalQuery !== query) {
      setQuery(globalQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchRef.current(query);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Debounce: lance la recherche 400ms après la dernière frappe
  useEffect(() => {
    const timeout = setTimeout(() => {
      // On appelle la ref (stable) plutôt que la prop (qui peut changer d'identité)
      onSearchRef.current(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return {
    query,
    setQuery,
    handleSubmit,
    handleQueryChange,
  };
};
