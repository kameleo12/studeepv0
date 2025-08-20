import { humanizeNumber } from "@root/modules/shared/utils/humanize-number";
import { useEstimatedFollowersGain } from "../hooks/use-estimated-followers-gain.hook";

interface EstimatedFollowersProps {
  viewCount: number;
}

const EstimatedFollowers = ({ viewCount }: EstimatedFollowersProps) => {
  const estimatedFollowers = useEstimatedFollowersGain(viewCount);

  let badgeColor = "bg-green-500";
  if (estimatedFollowers < 3000) {
    badgeColor = "bg-red-500";
  } else if (estimatedFollowers < 10000) {
    badgeColor = "bg-orange-500";
  }

  return (
    <>
      <h2 className="text-xl font-bold text-gray-700">
        Informations supplémentaires
      </h2>
      <div
        className={`px-3 py-1 w-1/2 text-center font-bold text-white rounded-full ${badgeColor}`}
      >
        Environ + {humanizeNumber(estimatedFollowers)} followers gagné
      </div>
    </>
  );
};

export default EstimatedFollowers;
