"use client";


import { Skeleton } from "@root/modules/dofus/react/search/components/Skeleton";
import { SearchCharacterItem } from "../components/SearchItem";
import { useSearchResultsCharacter } from "../hooks/use-search-results.hook";

import { motion } from "framer-motion";

export default function SearchResults() {
  const { characters, hasStarted, isLoading, searchId } =
    useSearchResultsCharacter();

  if (!hasStarted) return null;

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="p-5 border border-gray-200 rounded-xl max-w-4xl mx-auto"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Résultat des personnages</h2>
            <p className="text-gray-500">Chargement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-[230px] h-[340px]" />
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="p-5 border border-gray-200 rounded-xl max-w-4xl mx-auto">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            Résultat des personnages
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((character) => (
            <SearchCharacterItem
              key={character.id}
              character={character}
              searchId={searchId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
