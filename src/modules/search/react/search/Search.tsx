"use client";

import SearchBar from "@root/modules/search/react/search/components/SearchBar";
import SearchNavbar from "@root/modules/search/react/search/components/SearchNavbar";
import SearchResults from "@root/modules/search/react/search/components/SearchResults";
import { useSearch } from "@root/modules/search/react/search/use-search.hook";
import { useTranslation } from "@root/modules/shared/react/hooks/use-translation.hook";
import { motion, AnimatePresence } from "framer-motion";

export default function Search() {
  const { searchResults, onSearch } = useSearch();

  const { t } = useTranslation("search");

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
                  {t("title")}
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
