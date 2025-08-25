// modules/lol/core/testing/item.fixture.ts
import { ItemDomainModel } from "../model/item.domain-model";

export const createItemFixture = (
  over: Partial<ItemDomainModel.Item> = {}
): ItemDomainModel.Item => {
  const id = over.id ?? "item-1";
  return {
    id,
    name: over.name ?? "Amplifying Tome",
    icon: over.icon ?? `/lol-img/items/${id}.png`,
    price: over.price ?? 435,
    description: over.description ?? "Augmente légèrement la puissance.",
    stats: {
      AP: 20,
      AD: 0,
      PV: 0,
      RM: 0,
      R: 0,
      abilityHaste: 0,
      attackSpeed: 0,
      movementSpeed: 0,
      ...(over.stats ?? {}),
    },
    ...over,
  };
};
