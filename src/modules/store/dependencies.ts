import { ICharactersGateway } from "@root/modules/dofus/core/gateways/character.gateway";
import { IAnalyticsGateway } from "../global/core/gateways/analytics.gateway";
import { IStorageProvider } from "../global/core/providers/storage.provider";



export type Dependencies = {
  /* PROVIDERS */
  storageProvider: IStorageProvider;

  /* GATEWAYS */
  analyticsGateway: IAnalyticsGateway;

  charactersGateway: ICharactersGateway;
};
