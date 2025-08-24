// src/modules/app/main.ts
import axios, { AxiosInstance } from "axios";

import { Dependencies } from "../store/dependencies";
import { AppStore, createStore } from "../store/store";
import { InMemoryCharactersGateway } from "../dofus/gateways-impl/in-memory-character.gateway";
import { LocalStorageProvider } from "../global/providers-impl/local-storage.provider";
import { InMemoryAnalyticsGateway } from "../global/gateways-impl/in-memory-analytics.gateway";

export class App {
  public dependencies: Dependencies;
  public store: AppStore;
  public httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({ baseURL: "" });
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {
      /** PROVIDERS */
      storageProvider: new LocalStorageProvider(),

      /** GATEWAYS */
      analyticsGateway: new InMemoryAnalyticsGateway(),
      charactersGateway: new InMemoryCharactersGateway(),
    };
  }
}

export const app = new App();
