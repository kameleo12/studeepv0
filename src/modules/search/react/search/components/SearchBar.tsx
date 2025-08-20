"use client";

import React, { useRef, useState, useEffect } from "react";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { useSearchBar } from "@root/modules/search/react/search/hooks/use-search-bar.hook";
import { useQuerySuggestions } from "@root/modules/search/react/search/hooks/use-query-suggestions.hook";
import { useTranslation } from "@root/modules/shared/react/hooks/use-translation.hook";
import { SearchIcon } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@root/modules/shared/react/components/ui/Command";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const { t } = useTranslation("search");
  const { query, setQuery, searchType, handleSubmit } = useSearchBar({
    onSearch,
  });
  const { suggestions, isLoading } = useQuerySuggestions(query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const handleValueChange = (val: string) => {
    setQuery(val);
    setShowSuggestions(val.trim().length > 0);
  };

  const onSelectSuggestion = (suggestion: string) => {
    onSearch(suggestion);
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const placeholder =
    searchType === SearchDomainModel.SearchType.KEYWORD
      ? t("searchbar.keyword.placeholder")
      : t("searchbar.video.placeholder");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
    setShowSuggestions(false);
  };

  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className="relative w-full mt-8 mx-auto bg-white"
    >
      <Command
        className={`bg-white relative overflow-visible w-full ${
          showSuggestions ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"
        } border-gray-300 border-2 shadow-lg`}
      >
        <CommandInput
          value={query}
          onValueChange={handleValueChange}
          placeholder={placeholder}
          className="w-full mx-auto border-0 pr-6 py-4 text-gray-900 placeholder:text-gray-500 sm:text-lg sm:leading-6 focus:outline-none focus:ring-0 rounded-lg"
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-xl p-2 hover:bg-red-600"
        >
          <SearchIcon className="w-5 h-5 text-white" />
        </button>

        {showSuggestions && (
          <CommandList className="absolute top-full w-[512px] -left-[2px] z-50 bg-white rounded-b-2xl border-2 border-t-0 border-gray-300 shadow-lg max-h-[270px] overflow-y-auto">
            {isLoading && (
              <CommandEmpty className="p-4 text-center text-gray-500">
                Loading suggestions...
              </CommandEmpty>
            )}
            {!isLoading && suggestions.length === 0 && (
              <CommandEmpty className="p-4 text-center text-gray-500">
                No results found.
              </CommandEmpty>
            )}
            {suggestions.length > 0 && (
              <CommandGroup heading="Suggestions">
                {suggestions.slice(0, 6).map((sugg, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      onSelectSuggestion(sugg);
                    }}
                    className="px-6 py-3 cursor-pointer hover:bg-gray-100 flex items-center"
                  >
                    {sugg}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </form>
  );
}
