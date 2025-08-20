"use client";

import { motion, AnimatePresence } from "framer-motion";
import SearchNavbar from "@root/modules/search/react/search/components/SearchNavbar";
import { useLibraries } from "./use-libraries.hook";
import LibrariesList from "./components/LibrariesList";
import { CreateLibraryDialog } from "./components/CreateLibraryDialog";

export default function Libraries() {
  const { handleCreateLibrary } = useLibraries();

  const hasStarted = false;

  return (
    <section>
      <SearchNavbar />
      <motion.div
        className="flex flex-col items-center"
        animate={{ marginTop: hasStarted ? "1rem" : "4rem" }}
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
                  className="text-3xl md:text-2xl font-extrabold text-center leading-tight mb-2"
                >
                  Libraries
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-11/12 mx-auto lg:w-full mt-10">
        <div className="max-w-4xl mx-auto mb-4">
          <CreateLibraryDialog onCreate={handleCreateLibrary} />
        </div>
        <LibrariesList />
      </div>
    </section>
  );
}
