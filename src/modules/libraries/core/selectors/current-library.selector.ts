import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import dayjs from "dayjs";
import { humanizeNumber } from "@root/modules/shared/utils/humanize-number";
import { formatDuration } from "@root/modules/shared/utils/format-duration.utils";
import { getViralScoreColorCategory } from "@root/modules/search/core/utils/viral-score-color.utils";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export namespace LibraryVM {
  export type Media = {
    id: string;
    description: string;
    viralScore: number;
    likesCount: string;
    uploadedAt: string;
    viralScoreColor: string;
    thumbnailUrl: string;
    viewsCount: number;
    followersCount: string;
    blobUrl?: string;
    playUrl: string;
    duration: string;
    author: string;
    cookie: string;
  };

  export type CurrentLibrary = {
    hasLibrary: boolean;
    isLoading: boolean;
    libraryName: string;
    libraryId: string;
    medias: Media[];
  };
}

export const selectCurrentLibrary = createSelector(
  (state: AppState) => state.library.currentLibrary,
  (state: AppState) => state.library.loading,
  (currentLibrary, loading): LibraryVM.CurrentLibrary => {
    if (!currentLibrary) {
      return {
        hasLibrary: false,
        isLoading: loading,
        libraryName: "",
        libraryId: "",
        medias: [],
      };
    }

    return {
      hasLibrary: true,
      isLoading: loading,
      libraryName: currentLibrary.name,
      libraryId: currentLibrary.id,
      medias: currentLibrary.medias.map((media) => ({
        id: media.id,
        description: media.description,
        viralScore: media.viralScore,
        likesCount: humanizeNumber(media.likesCount),
        uploadedAt: dayjs.unix(Number(media.uploadedAt)).fromNow(),
        viralScoreColor: getViralScoreColorCategory(media.viralScore),
        thumbnailUrl: media.thumbnail,
        viewsCount: media.viewsCount,
        secUid: media.author.secUid,
        followersCount: humanizeNumber(media.author.followersCount),
        playUrl: media.playUrl,
        blobUrl: media.blobUrl,
        duration: formatDuration(media.duration),
        author: media.author.username || "Unknown",
        cookie: media.cookie,
      })),
    };
  }
);
