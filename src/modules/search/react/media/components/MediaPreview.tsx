"use client";
import { Copy, BookmarkPlus } from "lucide-react";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@root/modules/shared/react/components/ui/Tooltip";
import { AddMediaToLibraryDialog } from "../../../../libraries/react/libraries/components/AddMediaToLibraryDialog";
import Image from "next/image";
import TiktokLogo from "@root/assets/images/tiktok-logo.jpg";
import { useMediaPreviewItem } from "../hooks/use-media-preview.hook";

interface MediaPreviewProps {
  thumbnail: string;
  playUrl: string;
  title: string;
  author: string;
  id: string;
  searchId: string;
}

const MediaPreview = ({
  thumbnail,
  playUrl,
  title,
  author,
  id,
  searchId,
}: MediaPreviewProps) => {
  const { isHovered, handleMouseEnter, handleMouseLeave, handleCopyLink } =
    useMediaPreviewItem({ mediaId: id, searchId });

  const isBlobUrl = playUrl.startsWith("blob:");

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && isBlobUrl ? (
        <video
          src={playUrl}
          autoPlay
          muted
          loop
          className="w-3/5 mx-auto rounded-lg shadow-md object-cover"
          poster={thumbnail}
        >
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      ) : (
        <video
          src={playUrl}
          controls
          className="w-3/5 mx-auto rounded-lg shadow-md object-cover"
          poster={thumbnail}
        />
      )}

      <h1 className="mt-4 text-md font-bold text-center">{title}</h1>

      <div className="flex justify-center gap-4 mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <AddMediaToLibraryDialog
                mediaId={id}
                searchId={searchId}
                trigger={
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-gray-100">
                    <BookmarkPlus className="h-6 w-6 text-gray-700" />
                  </button>
                }
              />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-sm">Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-gray-100"
                onClick={() =>
                  handleCopyLink(
                    `https://www.tiktok.com/@${author}/video/${id}`
                  )
                }
              >
                <Copy className="h-5 w-5 text-gray-700" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-sm">Copy link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href={`https://www.tiktok.com/@${author}/video/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-gray-100"
              >
                <Image
                  src={TiktokLogo}
                  alt="TikTok Logo"
                  className="h-7 w-7 rounded-sm object-contain"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-sm">Open in TikTok</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MediaPreview;
