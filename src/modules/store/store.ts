import { useDispatch } from "react-redux";
import {
  AnyAction,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { Dependencies } from "@root/modules/store/dependencies";
import { AppState } from "@root/modules/store/app-state";
import { tiktokMediasSearchingReducer as tiktokMediasSearching } from "@root/modules/search/core/reducers/tiktok-medias-searching.reducer";
import { currentMediaReducer as currentMedia } from "@root/modules/search/core/reducers/current-media.reducer";
import { starSearchReducer as starSearch } from "@root/modules/search/core/reducers/star-searching.reducer";
import { querySuggestionsReducer as querySuggestions } from "@root/modules/search/core/reducers/query-suggestion.reducer";
import { libraryReducer as library } from "@root/modules/libraries/core/reducers/library.reducer";
import { currentStuffReducer as currentStuff } from "@root/modules/dofus/core/reducers/current-stuff.reducer";

const reducers = combineReducers({
  tiktokMediasSearching,
  currentMedia,
  starSearch,
  querySuggestions,
  library,
  currentStuff,
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
