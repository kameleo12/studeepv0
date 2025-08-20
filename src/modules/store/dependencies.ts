import { IAnalyticsGateway } from "@root/modules/global/core/gateways/analytics.gateway";
import { IStorageProvider } from "@root/modules/global/core/providers/storage.provider";
import { ITiktokMediasGateway } from "@root/modules/search/core/gateways/tiktok-medias.gateway";
import { ILibraryGateway } from "@root/modules/libraries/core/gateways/library.gateway";
import { IStuffGateway } from "@root/modules/dofus/core/gateways/stuff.gateway";

export type Dependencies = {
  /* PROVIDERS */
  storageProvider: IStorageProvider;

  /* GATEWAYS */
  analyticsGateway: IAnalyticsGateway;
  tiktokMediasGateway: ITiktokMediasGateway;
  libraryGateway: ILibraryGateway;
  stuffsGateway: IStuffGateway;
};
