import { ICharactersGateway } from "@root/modules/dofus/core/gateways/character.gateway";

import { IItemsGateway } from "@root/modules/lol/core/gateways/items.gateway";



export type Dependencies = {
  /* PROVIDERS */


  /* GATEWAYS */

  charactersGateway: ICharactersGateway;
   itemsGateway: IItemsGateway;
};
