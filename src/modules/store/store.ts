// modules/store/store.ts
import { useDispatch } from "react-redux";
import {
  AnyAction,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { Dependencies } from "./dependencies";
import { AppState } from "./app-state";

import { driveTreeReducer as driveTree } from "@root/modules/drive/core/reducers/drive-tree.slice";
import { driveTransferReducer as driveTransfer } from "@root/modules/drive/core/reducers/drive-transfer.slice";
import { driveViewerReducer as driveViewer } from "@root/modules/drive/core/reducers/drive-viewer.slice";

const reducers = combineReducers({
  driveTree,
  driveTransfer,
  driveViewer,
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
    preloadedState: config?.initialState as any,
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware: any) => {
      const middleware = getDefaultMiddleware({
        thunk: {
          extraArgument: config.dependencies,
        },
        serializableCheck: false,
      });

      return middleware;
    },
  });

  return store;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
