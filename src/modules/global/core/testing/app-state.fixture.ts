
import { AppState } from "@root/modules/store/app-state";

export const createInitialState = (state?: Partial<AppState>): AppState => ({
 
    stuffsSearching: {
          results: [],
          query: "testquery",
          loading: false,
          started: true,
          searchId: "search-id",
        },

        currentStuff: {
          stuff: null,
          loading: false,
        },
  ...state,
});
