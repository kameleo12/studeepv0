import { IAnalyticsGateway } from "../global/core/gateways/analytics.gateway";
import { IStorageProvider } from "../global/core/providers/storage.provider";

import { ICharactersGateway } from "../dofus/core/gateways/stuff.gateway";

export type Dependencies = {
  /* PROVIDERS */
  storageProvider: IStorageProvider;

  /* GATEWAYS */
  analyticsGateway: IAnalyticsGateway;

  charactersGateway: ICharactersGateway;
};
