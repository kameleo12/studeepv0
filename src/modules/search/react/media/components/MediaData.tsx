"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@root/modules/shared/react/components/ui/Tooltip";
import { getViralScoreStyles } from "@root/modules/search/core/utils/viral-score-color.utils";
import { ViralScoreColor } from "@root/modules/search/core/utils/viral-score-color.utils";

interface MediaDataProps {
  viewsCount: number;
  likesCount: string;
  viralScore: number;
  uploadedAt: string;
  viralScoreColor: ViralScoreColor;
}

const MediaData = ({
  viewsCount,
  likesCount,
  viralScore,
  uploadedAt,
  viralScoreColor,
}: MediaDataProps) => {
  const badgeStyles = getViralScoreStyles(viralScoreColor);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Détails</h2>
      <ul className="space-y-3 text-sm">
        <li className="flex justify-between">
          <span className="font-semibold text-gray-600">Vues :</span>
          <span className="text-gray-800">{viewsCount.toLocaleString()}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-gray-600">Likes :</span>
          <span className="text-gray-800">{likesCount}</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="font-semibold text-gray-600">Score viral :</span>
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
                <p className="text-sm">Viral score explanation goes here...</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li className="flex justify-between">
          <span className="font-semibold text-gray-600">Publié :</span>
          <span className="text-gray-800">{uploadedAt}</span>
        </li>
      </ul>
    </div>
  );
};

export default MediaData;
