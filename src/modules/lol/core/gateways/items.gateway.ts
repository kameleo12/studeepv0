// modules/lol/core/gateways/items.gateway.ts
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";

export interface IItemsGateway {
  searchByKeyword(keyword: string): Promise<{ searchId: string }>;
  getResults(searchId: string): Promise<ItemDomainModel.Item[]>;
  getById(
    itemId: string,
    searchId: string
  ): Promise<ItemDomainModel.Item | undefined>;
}
