// src/modules/app/main.ts
import axios, { AxiosInstance } from "axios";

import { Dependencies } from "../store/dependencies";
import { AppStore, createStore } from "../store/store";
import { InMemoryCharactersGateway } from "@root/modules/dofus/gateways-impl/in-memory-character.gateway";


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

      /** GATEWAYS */
      charactersGateway: new InMemoryCharactersGateway(),

    };
  }
}

export const app = new App();
