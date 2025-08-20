import { selectLibrariesList } from "./all-libraries.selector";
import { createInitialState } from "@root/modules/global/core/testing/app-state.fixture";

describe("selectLibrariesList", () => {
  it("should map each library to a view-model with totalMedias", () => {
    const state = createInitialState({
      library: {
        libraries: [
          {
            id: "lib_1",
            name: "Library 1",
            medias: [{ id: "m1" } as any, { id: "m2" } as any],
          },
          {
            id: "lib_2",
            name: "Library 2",
            medias: [],
          },
        ],
        currentLibrary: null,
        loading: false,
        error: null,
      },
    });

    const result = selectLibrariesList(state);

    expect(result).toEqual([
      { id: "lib_1", name: "Library 1", totalMedias: 2 },
      { id: "lib_2", name: "Library 2", totalMedias: 0 },
    ]);
  });

  it("should return an empty array if no libraries", () => {
    const state = createInitialState({
      library: {
        libraries: [],
        currentLibrary: null,
        loading: false,
        error: null,
      },
    });

    const result = selectLibrariesList(state);
    expect(result).toEqual([]);
  });
});
