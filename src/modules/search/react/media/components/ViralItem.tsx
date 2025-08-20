"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Copy, Link as ExternalLinkIcon } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@root/modules/shared/react/components/ui/Tooltip";
import { humanizeNumber } from "@root/modules/shared/utils/humanize-number";
import {
  getViralScoreStyles,
  ViralScoreColor,
} from "@root/modules/search/core/utils/viral-score-color.utils";
import { useBaseMediaActions } from "@root/modules/shared/react/hooks/use-base-media-item.hook";

interface ViralItemProps {
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

export default function ViralItem({
  imgUrl,
  title,
  id,
  viralScore,
  likes,
  createdAt,
  author,
  viralScoreColor,
  duration,
  viewsCount,
  playUrl,
  blobUrl,
  cookie,
}: ViralItemProps) {
  const { isHovered, setIsHovered, handleCopyLink } = useBaseMediaActions({
    playUrl,
    cookie,
  });

  const showVideo = isHovered && Boolean(blobUrl);
  const badgeStyles = getViralScoreStyles(viralScoreColor);

  return (
    <div
      className="flex flex-col gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease rounded-xl w-[180px]"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="relative">
        {showVideo ? (
          <video
            src={blobUrl}
            autoPlay
            muted
            loop
            className="rounded-xl w-[180px] h-[240px] object-cover"
          />
        ) : (
          <Image
            alt="TikTok Media"
            width={180}
            height={240}
            src={imgUrl}
            className="rounded-xl w-[180px] h-[240px] object-cover"
            style={{ objectFit: "cover" }}
          />
        )}

        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 rounded-lg">
          <p className="text-white text-xs">{duration}</p>
        </div>

        <div className="absolute top-3 right-3 w-8 h-8 flex flex-col gap-2">
          <div
            className="px-2 py-2 bg-white rounded-lg shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-all duration-300 ease cursor-pointer z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyLink(playUrl);
            }}
          >
            <Copy size={14} className="text-gray-500" />
          </div>
          <a
            href={`https://www.tiktok.com/@${author}/video/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-2 bg-white rounded-lg shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-all duration-300 ease cursor-pointer z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLinkIcon size={14} className="text-gray-500" />
          </a>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold leading-4 truncate">{title}</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`${badgeStyles} px-2 text-sm py-1 rounded-lg font-bold cursor-pointer`}
                >
                  x{viralScore}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="w-2/3">
                <p className="text-sm">Explication du viral score…</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-500 text-xs mt-1 font-light">{author}</p>
        <p className="text-gray-500 font-light text-xs">
          {humanizeNumber(viewsCount)} views • {likes} likes • {createdAt}
        </p>
      </div>
    </div>
  );
}
