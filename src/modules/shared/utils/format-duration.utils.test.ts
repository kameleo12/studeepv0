import { formatDuration } from "@root/modules/shared/utils/format-duration.utils";

describe("formatDuration", () => {
  it("should format the duration", () => {
    expect(formatDuration(60)).toEqual("1:00");
    expect(formatDuration(130)).toEqual("2:10");
    expect(formatDuration(120)).toEqual("2:00");
  });
});
