"use client";

import { motion } from "framer-motion";
import SearchNavbar from "@root/modules/search/react/search/components/SearchNavbar";
import LibraryResults from "./components/LibraryResults";
import { useLibrary } from "./use-library.hook";
import { useLibrariesList } from "../libraries/hooks/use-libraries-list.hook";

export default function Library() {
  const { isLoading: isGlobalLoading } = useLibrariesList();
  useLibrary();

  return (
    <section>
      <SearchNavbar />
      <motion.div
        className="flex flex-col items-center"
        animate={{ marginTop: "1rem" }}
      >
        <div className="max-w-lg w-11/12 mx-auto lg:w-full">
          <motion.div
            animate={{ height: "auto" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <div className="w-11/12 mx-auto lg:w-full mt-10 md:mt-20">
        {!isGlobalLoading && <LibraryResults />}
      </div>
    </section>
  );
}
