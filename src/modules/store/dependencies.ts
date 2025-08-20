import { IAnalyticsGateway } from "@root/modules/global/core/gateways/analytics.gateway";
import { IStorageProvider } from "@root/modules/global/core/providers/storage.provider";

import { IStuffsGateway } from "@root/modules/dofus/core/gateways/stuff.gateway";

export type Dependencies = {
  /* PROVIDERS */
  storageProvider: IStorageProvider;

  /* GATEWAYS */
  analyticsGateway: IAnalyticsGateway;

  stuffsGateway: IStuffsGateway;
};
