"use client";

import SearchNavbar from "@root/modules/search/react/search/components/SearchNavbar";
import StarSearchResults from "@root/modules/search/react/star-search/components/StarSearchResults";
import { useStarSearchResults } from "@root/modules/search/react/star-search/hooks/use-star-search-results.hook";
import { useStarSearch } from "@root/modules/search/react/star-search/use-star-search.hook";
import { useTranslation } from "@root/modules/shared/react/hooks/use-translation.hook";
import { motion, AnimatePresence } from "framer-motion";

export default function StarSearch() {
  useStarSearch();
  const { medias, hasStarted, isLoading } = useStarSearchResults();
  const { t } = useTranslation("star");

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10">
      <SearchNavbar />
      <motion.div
        className="flex flex-col items-center"
        animate={{ marginTop: hasStarted ? "1rem" : "11rem" }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-7xl mx-auto">
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
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight mb-2 px-4"
                >
                  {t("title")}
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
      <div className="w-full max-w-8xl mx-auto mt-8 md:mt-12 lg:mt-16 px-4 sm:px-6 md:px-8">
        <StarSearchResults />
      </div>
    </section>
  );
}
