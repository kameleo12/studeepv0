"use client";

import SearchBar from "../search/components/SearchBar";
import SearchNavbar from "../search/components/SearchNavbar";
import SearchResults from "../search/components/SearchResults";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "../../../store/store";
import { getCharacterResults } from "../../core/usecase/get-results.usecase";
import { useSearchResultsCharacter } from "../search/hooks/use-search-results.hook";
import { searchCharacters } from "../../core/usecase/search-stuff.usecase";
import { useEffect } from "react";

export default function Search() {
  const { characters, hasStarted, isLoading, searchId } =
    useSearchResultsCharacter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadDefault = async () => {
      if (hasStarted) return;
      const { searchId } = await dispatch(
        searchCharacters({ query: "" })
      ).unwrap();
      await dispatch(getCharacterResults({ searchId }));
    };
    loadDefault();
  }, [dispatch, hasStarted]);

  const onSearch = async (query: string) => {
    const { searchId } = await dispatch(searchCharacters({ query })).unwrap();
    await dispatch(getCharacterResults({ searchId }));
  };

  return (
    <section>
      <SearchNavbar />
      <motion.div
        className="flex flex-col items-center"
        animate={{ marginTop: hasStarted ? "1rem" : "11rem" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-lg w-11/12 mx-auto lg:w-full">
          <motion.div
            animate={{ height: hasStarted ? 0 : "auto" }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {!hasStarted && (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-6xl font-extrabold text-center leading-tight mb-2"
                >
                  Personnages
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <SearchBar onSearch={onSearch} />
          </motion.div>
        </div>
      </motion.div>

      <div className="w-11/12 mx-auto lg:w-full mt-10 md:mt-20">
        <SearchResults />
      </div>
    </section>
  );
}
