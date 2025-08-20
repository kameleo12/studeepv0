"use client";

import { useStarSearchResults } from "@root/modules/search/react/star-search/hooks/use-star-search-results.hook";
import { StarSearchItem } from "@root/modules/search/react/star-search/components/StarSearchItem";
import { Skeleton } from "@root/modules/shared/react/components/ui/Skeleton";
import { motion } from "framer-motion";
import { useTranslation } from "@root/modules/shared/react/hooks/use-translation.hook";
import { ViralScoreColor } from "@root/modules/search/core/utils/viral-score-color.utils";

export default function StarSearchResults() {
  const { medias, hasStarted, isLoading } = useStarSearchResults();
  const { t } = useTranslation("star");

  if (!hasStarted) return null;

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="p-5 border border-gray-200 rounded-xl max-w-7xl mx-auto"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{t("results.title")}</h2>
            <p className="text-gray-500">{t("results.loading")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6 justify-items-center">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-full max-w-[250px]">
                <Skeleton className="w-full aspect-square" />
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  if (!medias || medias.length === 0) {
    return (
      <section className="p-5 border border-gray-200 rounded-xl max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg text-gray-500">{t("results.empty")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-5 border border-gray-200 rounded-xl max-w-7xl mx-auto">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            {t("results.title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6 justify-items-center">
          {medias.map((media) => (
            <div key={media.id} className="w-full max-w-[250px]">
              <StarSearchItem
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
