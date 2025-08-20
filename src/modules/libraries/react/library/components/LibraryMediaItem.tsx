"use client";

import { BaseMediaItem } from "@root/modules/shared/react/components/BaseMediaItem";
import { useBaseMediaActions } from "@root/modules/shared/react/hooks/use-base-media-item.hook";
import { ViralScoreColor } from "@root/modules/search/core/utils/viral-score-color.utils";
import { motion } from "framer-motion";

interface LibraryMediaItemProps {
  libraryId: string;
  imgUrl: string;
  title: string;
  id: string;
  viralScore: number;
  likes: string;
  createdAt: string;
  author: string;
  viralScoreColor: ViralScoreColor;
  duration: string;
  viewsCount: number;
  playUrl: string;
  blobUrl?: string;
  cookie: string;
  deleteMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (mediaId: string) => void;
}

export function LibraryMediaItem({
  libraryId,
  deleteMode = false,
  selected = false,
  onToggleSelect,
  ...rest
}: LibraryMediaItemProps) {
  const { isHovered, setIsHovered, handleCopyLink } = useBaseMediaActions({
    playUrl: rest.playUrl,
    cookie: rest.cookie,
  });

  const handleClick = () => {
    if (deleteMode && onToggleSelect) {
      onToggleSelect(rest.id);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${deleteMode && selected ? "border-red-500" : ""} ${
        deleteMode ? "cursor-pointer" : ""
      }`}
    >
      <BaseMediaItem
        {...rest}
        link={`/library-media/${rest.id}?libraryId=${libraryId}`}
        isHovered={isHovered}
        onCopyLink={handleCopyLink}
        addToLibraryProps={{ mediaId: rest.id }}
        cookie={rest.cookie}
      />
    </motion.div>
  );
}
