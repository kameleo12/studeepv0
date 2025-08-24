"use client";

import React, { useRef, useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import {
  Command,
  CommandInput,
} from "../../../../shared/react/components/ui/Command";
import { useSearchBarCharacter } from "../hooks/use-search-bar.hook";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const { query, setQuery, handleSubmit } = useSearchBarCharacter({
    onSearch,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const handleValueChange = (val: string) => {
    setQuery(val);
    setShowSuggestions(val.trim().length > 0);
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
          className="w-full mx-auto border-0 pr-6 py-4 text-gray-900 placeholder:text-gray-500 sm:text-lg sm:leading-6 focus:outline-none focus:ring-0 rounded-lg"
          placeholder="Chercher un personnage"
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-xl p-2 hover:bg-red-600"
        >
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </Command>
    </form>
  );
}
