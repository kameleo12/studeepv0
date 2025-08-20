"use client";

import Image from "next/image";
import { Link } from "@root/modules/shared/react/libs/navigation";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@root/modules/shared/react/components/ui/Tooltip";
import { Copy, BookmarkPlus } from "lucide-react";
import TiktokLogo from "@root/assets/images/tiktok-logo.jpg";
import { humanizeNumber } from "@root/modules/shared/utils/humanize-number";
import { ReactNode } from "react";
import { AddMediaToLibraryDialog } from "../../../libraries/react/libraries/components/AddMediaToLibraryDialog";
import {
  getViralScoreStyles,
  ViralScoreColor,
} from "@root/modules/search/core/utils/viral-score-color.utils";

export interface AddToLibraryProps {
  mediaId: string;
  searchId?: string;
}

export interface BaseMediaItemProps {
  id: string;
  imgUrl: string;
  title: string;
  viralScore: number;
  likes: string;
  createdAt: string;
  author: string;
  viralScoreColor: ViralScoreColor;
  duration: string;
  viewsCount: number;
  playUrl: string;
  blobUrl?: string;
  link: string;
  isHovered: boolean;
  onCopyLink: (link: string) => void;
  extraActions?: ReactNode;
  addToLibraryProps?: AddToLibraryProps;
  cookie: string;
}

export function BaseMediaItem({
  id,
  imgUrl,
  title,
  viralScore,
  likes,
  createdAt,
  author,
  viralScoreColor,
  duration,
  viewsCount,
  playUrl,
  blobUrl,
  link,
  isHovered,
  onCopyLink,
  extraActions,
  addToLibraryProps,
}: BaseMediaItemProps) {
  const badgeStyles = getViralScoreStyles(viralScoreColor);
  const showVideo = isHovered && Boolean(blobUrl);
  return (
    <div className="group relative flex flex-col gap-2">
      <div className="relative w-[250px] overflow-hidden rounded-xl transition-all duration-300 hover:bg-gray-100">
        {addToLibraryProps && (
          <div className="absolute right-3 top-0 z-30 overflow-hidden rounded-b-xl rounded-t-none">
            <AddMediaToLibraryDialog
              mediaId={addToLibraryProps.mediaId}
              searchId={addToLibraryProps.searchId || ""}
              trigger={
                <button className="flex h-10 w-10 items-center justify-center bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-primary/20">
                  <BookmarkPlus className="h-6 w-6 text-gray-700" />
                </button>
              }
            />
          </div>
        )}
        <div className="absolute left-2 top-2 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`${badgeStyles} rounded-lg px-3 py-1.5 text-sm font-bold shadow-md`}
                >
                  x{viralScore}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-[200px]">
                <p className="text-sm">Explication du viral score…</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Link href={link} className="relative block">
          <div className="overflow-hidden rounded-xl">
            {showVideo ? (
              <video
                src={blobUrl}
                autoPlay
                muted
                loop
                className="h-[340px] w-[250px] object-cover"
              />
            ) : (
              <Image
                alt="TikTok Media"
                width={300}
                height={500}
                src={imgUrl}
                className="h-[340px] w-[250px] object-cover"
                quality={80}
              />
            )}
          </div>
          <div className="absolute bottom-2 right-3 rounded-lg bg-black/50 px-2.5 py-1 backdrop-blur-sm">
            <p className="text-xs font-medium text-white">{duration}</p>
          </div>
          {isHovered && (
            <div className="absolute right-3 top-12 z-20 flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCopyLink(imgUrl);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-gray-100"
              >
                <Copy className="h-5 w-5 text-gray-700" />
              </button>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(
                    `https://www.tiktok.com/@${author}/video/${id}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-gray-100"
              >
                <Image
                  src={TiktokLogo}
                  alt="TikTok Logo"
                  className="h-7 w-7 rounded-sm object-contain"
                />
              </div>
            </div>
          )}
          {extraActions && (
            <div className="absolute right-16 top-0 z-30">{extraActions}</div>
          )}
        </Link>
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900">
            {title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs font-medium text-gray-600">
            {author}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">{createdAt}</p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <span>{humanizeNumber(viewsCount)} views</span>
            <span>•</span>
            <span>{likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
