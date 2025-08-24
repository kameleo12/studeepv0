import { createStore } from "../store/store";
import { Dependencies } from "../store/dependencies";
import { StubStorageProvider } from "../global/core/testing/stub-storage.provider";
import { InMemoryAnalyticsGateway } from "../global/gateways-impl/in-memory-analytics.gateway";

import { AppState } from "../store/app-state";
import { InMemoryCharactersGateway } from "@root/modules/dofus/gateways-impl/in-memory-character.gateway";

/**
 * Create testing dependencies with provided defaults
 */
const createDependencies = (
  dependencies?: Partial<Dependencies>
): Dependencies => ({
  analyticsGateway: new InMemoryAnalyticsGateway(),
  storageProvider: new StubStorageProvider(),
  // ✅ indispensable depuis la migration
  charactersGateway: new InMemoryCharactersGateway(),
  ...dependencies,
});

/**
 * Creates store initialized with a partial state
 */
export const createTestStore = (config?: {
  initialState?: Partial<AppState>;
  dependencies?: Partial<Dependencies>;
}) => {
  const initialStore = createStore({
    dependencies: createDependencies(config?.dependencies),
  });

  // ✅ assure à TS qu'on fournit bien un AppState complet
  const initialState: AppState = {
    ...initialStore.getState(),
    ...config?.initialState,
  } as AppState;

  const store = createStore({
    initialState,
    dependencies: createDependencies(config?.dependencies),
  });

  return store;
};

/**
 * Useful for testing selectors without setting redux up
 */
export const createTestState = (partialState?: Partial<AppState>) => {
  const store = createStore({
    dependencies: createDependencies(),
  });

  const storeInitialState = store.getState();

  const merged: AppState = {
    ...storeInitialState,
    ...partialState,
  } as AppState;

  return createTestStore({ initialState: merged }).getState();
};
