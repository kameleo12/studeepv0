"use client";

import { BaseMediaItem } from "@root/modules/shared/react/components/BaseMediaItem";
import { useBaseMediaActions } from "@root/modules/shared/react/hooks/use-base-media-item.hook";
import { ViralScoreColor } from "@root/modules/search/core/utils/viral-score-color.utils";

interface StarSearchItemProps {
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
}

export function StarSearchItem(props: StarSearchItemProps) {
  const { isHovered, setIsHovered, handleCopyLink } = useBaseMediaActions({
    playUrl: props.playUrl,
    cookie: props.cookie,
  });

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BaseMediaItem
        {...props}
        link={`/star-media/${props.id}`}
        isHovered={isHovered}
        onCopyLink={handleCopyLink}
        addToLibraryProps={{ mediaId: props.id }}
        cookie={props.cookie}
      />
    </div>
  );
}
