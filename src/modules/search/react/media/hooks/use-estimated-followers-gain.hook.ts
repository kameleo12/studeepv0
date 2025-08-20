import { useMemo } from "react";
import { estimateFollowersGain } from "@root/modules/search/core/utils/estimate-followers-gain.utils";

export const useEstimatedFollowersGain = (viewCount: number) => {
  const estimatedFollowers = useMemo(
    () => estimateFollowersGain(viewCount),
    [viewCount]
  );

  return estimatedFollowers;
};
