"use client";

import { motion } from "framer-motion";

export default function Runes() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-center leading-tight mb-6"
      >
        Page Runes
      </motion.h1>

      <p className="text-lg text-neutral-600 dark:text-neutral-300">
        Ici tu pourras configurer tes runes.
      </p>
    </section>
  );
}
