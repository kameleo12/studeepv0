// src/modules/app/main.ts
import axios, { AxiosInstance } from "axios";

import { Dependencies } from "../store/dependencies";
import { AppStore, createStore } from "../store/store";
import { LocalStorageProvider } from "../global/providers-impl/local-storage.provider";
import { InMemoryAnalyticsGateway } from "../global/gateways-impl/in-memory-analytics.gateway";
import { InMemoryCharactersGateway } from "@root/modules/dofus/gateways-impl/in-memory-character.gateway";
import { InMemoryItemsGateway } from "@root/modules/lol/gateways-impl/in-memory-items.gateway";

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
      itemsGateway: new InMemoryItemsGateway(),
    };
  }
}

export const app = new App();
