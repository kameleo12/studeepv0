interface FollowersGain {
  views: number;
  followers: number;
}

const followersGainTable: FollowersGain[] = [
  { views: 250_000, followers: 1500 },
  { views: 250_000, followers: 2100 },
  { views: 400_000, followers: 1740 },
  { views: 500_000, followers: 3300 },
  { views: 600_000, followers: 4500 },
  { views: 800_000, followers: 2180 },
  { views: 900_000, followers: 8000 },
  { views: 1_000_000, followers: 9150 },
  { views: 1_000_000, followers: 4000 },
  { views: 1_000_000, followers: 5000 },
  { views: 1_300_000, followers: 11_000 },
  { views: 1_500_000, followers: 8000 },
  { views: 1_500_000, followers: 12_500 },
  { views: 2_000_000, followers: 20_000 },
  { views: 3_000_000, followers: 20_000 },
  { views: 4_000_000, followers: 35_000 },
  { views: 5_000_000, followers: 33_000 },
  //   { views: 6_000_000, followers: 50_000 },
  //   { views: 7_000_000, followers: 55_000 },
  //   { views: 8_000_000, followers: 60_000 },
  //   { views: 9_000_000, followers: 65_000 },
  //   { views: 10_000_000, followers: 70_000 },
  //   { views: 15_000_000, followers: 100_000 },
  //   { views: 20_000_000, followers: 120_000 },
  //   { views: 25_000_000, followers: 150_000 },
  //   { views: 30_000_000, followers: 180_000 },
  //   { views: 35_000_000, followers: 200_000 },
  //   { views: 40_000_000, followers: 220_000 },
  //   { views: 45_000_000, followers: 250_000 },
  //   { views: 50_000_000, followers: 300_000 },
  //   { views: 55_000_000, followers: 320_000 },
  //   { views: 60_000_000, followers: 350_000 },
  //   { views: 65_000_000, followers: 380_000 },
  //   { views: 70_000_000, followers: 400_000 },
  //   { views: 75_000_000, followers: 420_000 },
  //   { views: 80_000_000, followers: 450_000 },
  //   { views: 85_000_000, followers: 470_000 },
  //   { views: 90_000_000, followers: 500_000 },
  //   { views: 95_000_000, followers: 530_000 },
  //   { views: 100_000_000, followers: 550_000 },
];

export function estimateFollowersGain(viewCount: number): number {
  if (!viewCount || viewCount <= 0) {
    throw new Error("View count must be a positive number.");
  }

  const closestMatch = followersGainTable.reduce((prev, curr) => {
    const prevDiff = Math.abs(viewCount - prev.views);
    const currDiff = Math.abs(viewCount - curr.views);
    return currDiff < prevDiff ? curr : prev;
  });

  return closestMatch.followers;
}
