
import { AppState } from "@root/modules/store/app-state";

export const createInitialState = (state?: Partial<AppState>): AppState => ({
 
    charactersSearching: {
          results: [],
          query: "testquery",
          loading: false,
          started: true,
          searchId: "search-id",
        },

        currentCharacter: {
          character: null,
          loading: false,
        },
  ...state,
});
