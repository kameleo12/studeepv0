import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import { SearchResultsVM } from "@root/modules/search/core/models/search-results.view-model";
import { formatDuration } from "@root/modules/shared/utils/format-duration.utils";
import { humanizeNumber } from "@root/modules/shared/utils/humanize-number";
import { getViralScoreColorCategory } from "@root/modules/search/core/utils/viral-score-color.utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const selectTiktokSearchResults: (
  state: AppState
) => SearchResultsVM.Display = createSelector(
  (state: AppState) => state.tiktokMediasSearching,
  (searchingState) => ({
    searchId: searchingState.searchId,
    hasStarted: searchingState.started,
    isLoading: searchingState.loading,
    medias: searchingState.results.map((media) => ({
      id: media.id,
      description: media.description,
      viralScore: media.viralScore,
      likesCount: humanizeNumber(media.likesCount),
      uploadedAt: dayjs.unix(Number(media.uploadedAt)).fromNow(),
      viralScoreColor: getViralScoreColorCategory(media.viralScore),
      thumbnailUrl: media.thumbnail,
      viewsCount: media.viewsCount,
      followersCount: humanizeNumber(media.author.followersCount),
      secUid: media.author.secUid,
      playUrl: media.playUrl,
      blobUrl: media.blobUrl,
      duration: formatDuration(media.duration),
      author: media.author.username || "Unknown",
      cookie: media.cookie,
    })),
  })
);
