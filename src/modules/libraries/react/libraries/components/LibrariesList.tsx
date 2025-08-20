"use client";

import { motion } from "framer-motion";
import LibraryItem from "./LibraryItem";
import { useLibrariesList } from "../hooks/use-libraries-list.hook";

export default function LibrariesList() {
  const { libraries, isLoading } = useLibrariesList();

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="p-8 border border-gray-200 rounded-xl max-w-4xl mx-auto flex justify-center items-center"
      >
        <p className="text-lg text-gray-500">Loading libraries...</p>
      </motion.section>
    );
  }

  if (!libraries || libraries.length === 0) {
    return (
      <section className="p-8 border border-gray-200 rounded-xl max-w-4xl mx-auto flex flex-col justify-center items-center">
        <p className="text-xl font-semibold text-gray-700">
          You don&apos;t have any libraries yet
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Start by creating a new library.
        </p>
      </section>
    );
  }

  return (
    <section className="p-8 border border-gray-200 rounded-xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraries.map((library) => (
          <LibraryItem
            key={library.id}
            id={library.id}
            name={library.name}
            totalMedias={library.totalMedias}
          />
        ))}
      </div>
    </section>
  );
}
