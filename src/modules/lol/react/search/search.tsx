"use client";


import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@root/modules/store/store";
import { useEffect } from "react";

import { searchItems } from "@root/modules/lol/core/usecase/search-item.usecase";
import { useSearchResultsItems } from "@root/modules/lol/react/search/hook/use-search-results.hook";
import { getItemResults } from "@root/modules/lol/core/usecase/get-item-results";
import SearchNavbar from "@root/modules/lol/react/search/components/SearchNavbar";
import SearchBar from "@root/modules/lol/react/search/components/SearchBar";
import SearchResults from "@root/modules/lol/react/search/components/SearchResults";


export default function Search() {
  const { items, hasStarted, isLoading, searchId } = useSearchResultsItems();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadDefault = async () => {
      if (hasStarted) return;
      const { searchId } = await dispatch(searchItems({ query: "" })).unwrap();
      await dispatch(getItemResults({ searchId }));
    };
    loadDefault();
  }, [dispatch, hasStarted]);

  const onSearch = async (query: string) => {
    const { searchId } = await dispatch(searchItems({ query })).unwrap();
    await dispatch(getItemResults({ searchId }));
  };

  return (
    <section>
      <SearchNavbar />
      <motion.div
        className="flex flex-col items-center"
        animate={{ marginTop: hasStarted ? "1rem" : "11rem" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-lg w-11/12 mx-auto lg:w/full">
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
                  Objets LoL
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

      <div className="w-11/12 mx-auto lg:w/full mt-10 md:mt-20">
        <SearchResults />
      </div>
    </section>
  );
}
