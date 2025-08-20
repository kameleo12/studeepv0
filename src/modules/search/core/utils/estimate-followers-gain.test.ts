import { estimateFollowersGain } from "./estimate-followers-gain.utils";

describe("estimateFollowersGain", () => {
  it("should return the correct followers for a given view count", () => {
    expect(estimateFollowersGain(250_000)).toBe(1500);
    expect(estimateFollowersGain(900_000)).toBe(8000);
    expect(estimateFollowersGain(1_000_000)).toBe(9150);
    expect(estimateFollowersGain(3_000_000)).toBe(20_000);
  });

  it("should handle edge cases with no view count", () => {
    expect(() => estimateFollowersGain(0)).toThrow(
      "View count must be a positive number."
    );
    expect(() => estimateFollowersGain(-1)).toThrow(
      "View count must be a positive number."
    );
  });

  it("should find the closest match for non-exact view counts", () => {
    expect(estimateFollowersGain(850_000)).toBe(2180);
    expect(estimateFollowersGain(1_250_000)).toBe(11_000);
  });
});
