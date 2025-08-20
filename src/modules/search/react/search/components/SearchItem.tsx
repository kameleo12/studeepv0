"use client";

import { BaseMediaItem } from "@root/modules/shared/react/components/BaseMediaItem";
import { useBaseMediaActions } from "@root/modules/shared/react/hooks/use-base-media-item.hook";
import { ViralScoreColor } from "@root/modules/search/core/utils/viral-score-color.utils";

interface SearchItemProps {
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
  searchId: string;
  cookie: string;
}

export function SearchItem({ searchId, ...rest }: SearchItemProps) {
  const { isHovered, setIsHovered, handleCopyLink } = useBaseMediaActions({
    playUrl: rest.playUrl,
    cookie: rest.cookie,
  });

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BaseMediaItem
        {...rest}
        link={`/search-media/${rest.id}?searchId=${searchId}`}
        isHovered={isHovered}
        onCopyLink={handleCopyLink}
        addToLibraryProps={{ mediaId: rest.id, searchId }}
        cookie={rest.cookie}
      />
    </div>
  );
}
