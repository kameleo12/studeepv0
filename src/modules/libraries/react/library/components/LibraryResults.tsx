"use client";

import { motion } from "framer-motion";
import { LibraryMediaItem } from "./LibraryMediaItem";
import { useLibraryResults } from "../hooks/use-library-results.hook";
import { useLibraryMediaDelete } from "../hooks/use-library-medias-delete.hook";
import { ViralScoreColor } from "@root/modules/search/core/utils/viral-score-color.utils";

export default function LibraryResults() {
  const { hasLibrary, isLoading, libraryName, libraryId, medias } =
    useLibraryResults();
  const { deleteMode, selectedMediaIds, toggleDeleteMode, toggleSelectMedia } =
    useLibraryMediaDelete(libraryId);

  if (!hasLibrary) {
    return (
      <section className="p-5 border border-gray-200 rounded-xl max-w-4xl mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg text-gray-500">No library found</p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="p-5 border border-gray-200 rounded-xl max-w-4xl mx-auto"
      >
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg text-gray-500">
            Loading medias of {libraryName}...
          </p>
        </div>
      </motion.section>
    );
  }

  if (medias.length === 0) {
    return (
      <section className="p-5 border border-gray-200 rounded-xl max-w-4xl mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg text-gray-500">No medias in this library</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`p-5 border border-gray-200 rounded-xl max-w-4xl mx-auto ${
        deleteMode ? "bg-red-100" : ""
      }`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            Medias in {libraryName}
          </motion.h2>
          <button
            onClick={toggleDeleteMode}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {deleteMode ? "Valider la suppression" : "Supprimer des médias"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medias.map((media) => (
            <LibraryMediaItem
              key={media.id}
              libraryId={libraryId}
              id={media.id}
              imgUrl={media.thumbnailUrl}
              title={media.description}
              viralScoreColor={media.viralScoreColor as ViralScoreColor}
              viralScore={media.viralScore}
              likes={media.likesCount}
              createdAt={media.uploadedAt}
              author={media.author}
              duration={media.duration}
              viewsCount={media.viewsCount}
              playUrl={media.playUrl}
              blobUrl={media.blobUrl}
              cookie={media.cookie}
              deleteMode={deleteMode}
              selected={selectedMediaIds.includes(media.id)}
              onToggleSelect={toggleSelectMedia}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
