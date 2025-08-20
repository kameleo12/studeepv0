// @root/modules/search/core/selectors/current-stuff.selector.spec.ts
import { selectCurrentStuff } from "./current-stuff.selector";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";
import { StuffFactory } from "../model/stuff.factory";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

describe("CurrentStuff Selectors", () => {
  let initialState: ReturnType<typeof createInitialState>;

  beforeEach(() => {
    initialState = createInitialState({
      currentStuff: {
        stuff: StuffFactory.create({
          id: "1",
          uploadedAt: dayjs().subtract(1, "day").toISOString(),
          thumbnail: "thumbnail",
          power: 7,
          items: {
            thumbnail: "item-thumbnail",
            power: 10,
            health: 100,
            description: "test current stuff",
          },
        }),
        loading: false,
      },
    });
  });

  it("should return the current stuff transformed to the view model", () => {
    const currentStuff = selectCurrentStuff(initialState);

    expect(currentStuff).toEqual({
      id: "1",
      uploadedAt: "a day ago",
      thumbnail: "thumbnail",
      power: 7,
      itemThumbnail: "item-thumbnail",
      itemPower: 10,
      itemHealth: 100,
      itemDescription: "test current stuff",
    });
  });

  it("should return null if no current stuff exists", () => {
    initialState = createInitialState({
      currentStuff: {
        stuff: null,
        loading: false,
      },
    });

    const currentStuff = selectCurrentStuff(initialState);
    expect(currentStuff).toBeNull();
  });
});