import { InMemoryAnalyticsGateway } from "@root/modules/global/gateways-impl/in-memory-analytics.gateway";
import { LocalStorageProvider } from "@root/modules/global/providers-impl/local-storage.provider";
import { HttpTiktokMediasGateway } from "@root/modules/search/gateways-impl/http-tiktok-medias.gateway";
import { HttpLibraryGateway } from "@root/modules/libraries/gateway-impl/http-library.gateway";
import { Dependencies } from "@root/modules/store/dependencies";
import { AppStore, createStore } from "@root/modules/store/store";
import axios, { AxiosInstance } from "axios";
import { InMemoryTiktokMediasGateway } from "@root/modules/search/gateways-impl/in-memory-tiktok-medias.gateway";

export class App {
  public dependencies: Dependencies;
  public store: AppStore;
  public httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://viral-short-backend-e9b52f0c4dd8.herokuapp.com/",
    });
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {
      /** PROVIDERS */
      storageProvider: new LocalStorageProvider(),

      /** GATEWAYS */
      analyticsGateway: new InMemoryAnalyticsGateway(),
      tiktokMediasGateway: new InMemoryTiktokMediasGateway,
      libraryGateway: new HttpLibraryGateway(this.httpClient),
    };
  }
}

export const app = new App();
