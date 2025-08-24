import { useDispatch } from "react-redux";
import {
  AnyAction,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { Dependencies } from "./dependencies";
import { AppState } from "./app-state";
import { currentCharacterReducer as currentCharacter } from "../dofus/core/reducers/current-character.reducer";
import { charactersSearchingReducer as charactersSearching } from "../dofus/core/reducers/search-results.reducer";
import { characterSlotsReducer as characterSlots } from "@root/modules/dofus/core/reducers/character-slots.reducer";

const reducers = combineReducers({
  currentCharacter,
  charactersSearching,
  characterSlots,
});

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = ThunkDispatch<AppState, Dependencies, AnyAction>;
export type AppGetState = AppStore["getState"];
export type ThunkApi = {
  dispatch: AppDispatch;
  state: AppState;
  extra: Dependencies;
};

export const createStore = (config: {
  initialState?: AppState;
  dependencies: Dependencies;
}) => {
  const store = configureStore({
    preloadedState: config?.initialState,
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware: any) => {
      const middleware = getDefaultMiddleware({
        thunk: {
          extraArgument: config.dependencies,
        },
      });

      return middleware;
    },
  });

  return store;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
