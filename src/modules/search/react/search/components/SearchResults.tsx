import SortingSwitch from "@root/modules/search/react/sorting/SortingSwitch";
import { SearchItem } from "@root/modules/search/react/search/components/SearchItem";
import { useSearchResults } from "@root/modules/search/react/search/hooks/use-search-results.hook";
import { Skeleton } from "@root/modules/shared/react/components/ui/Skeleton";
import { useTranslation } from "@root/modules/shared/react/hooks/use-translation.hook";
import { ViralScoreColor } from "@root/modules/search/core/utils/viral-score-color.utils";
import { motion } from "framer-motion";

export default function SearchResults() {
  const { medias, hasStarted, isLoading, searchId } = useSearchResults();
  const { t } = useTranslation("search");

  if (!hasStarted) return null;

  if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="p-5 border border-gray-200 rounded-xl max-w-4xl mx-auto"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{t("results.title")}</h2>
            <p className="text-gray-500">{t("results.loading")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-[230px] h-[340px]" />
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="p-5 border border-gray-200 rounded-xl max-w-4xl mx-auto">
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500"
          >
            {t("results.description", { mediasLength: medias.length })}
          </motion.p>
          <SortingSwitch />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medias.map((media) => (
            <SearchItem
              key={media.id}
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
              searchId={searchId}
              cookie={media.cookie}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
