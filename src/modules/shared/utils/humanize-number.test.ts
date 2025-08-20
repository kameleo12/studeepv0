import { humanizeNumber } from "@root/modules/shared/utils/humanize-number";

describe("humanizeNumber", () => {
  it("should return the number with the correct suffix", () => {
    expect(humanizeNumber(1000)).toEqual("1K");
  });
  it("should return the number with the correct suffix", () => {
    expect(humanizeNumber(1000000)).toEqual("1M");
  });
  it("should return the number with the correct suffix", () => {
    expect(humanizeNumber(1000000000)).toEqual("1B");
  });
  it("should return the number with the correct suffix", () => {
    expect(humanizeNumber(1000000000000)).toEqual("1T");
  });

  it("should show decimals if the number is not a round number", () => {
    expect(humanizeNumber(1230)).toEqual("1.2K");
    expect(humanizeNumber(129384)).toEqual("129.3K");
  });
});
