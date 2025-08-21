"use client";

import SearchBar from "@root/modules/dofus/react/search/components/SearchBar";
import SearchNavbar from "@root/modules/dofus/react/search/components/SearchNavbar";
import SearchResults from "@root/modules/dofus/react/search/components/SearchResults";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@root/modules/store/store";
import { getStuffResults } from "@root/modules/dofus/core/usecase/get-results.usecase";
import { useSearchResultsStuff } from "@root/modules/dofus/react/search/hooks/use-search-results.hook";
import { searchStuffs } from "@root/modules/dofus/core/usecase/search-stuff.usecase";


export default function Search() {
  const { stuffs, hasStarted, isLoading, searchId } = useSearchResultsStuff();

  const dispatch = useAppDispatch();

  const onSearch = async (query: string) => {
    const { searchId } = await dispatch(searchStuffs({ query })).unwrap();
    await dispatch(getStuffResults({ searchId }));
  };

  const searchResults = { stuffs, hasStarted, isLoading, searchId };

  return (
    <section>
      <SearchNavbar />
      <motion.div
        className="flex flex-col items-center"
        animate={{ marginTop: searchResults.hasStarted ? "1rem" : "11rem" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-lg w-11/12 mx-auto lg:w-full">
          <motion.div
            animate={{ height: searchResults.hasStarted ? 0 : "auto" }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {!searchResults.hasStarted && (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-6xl font-extrabold text-center leading-tight mb-2"
                >
                  Stuff
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
