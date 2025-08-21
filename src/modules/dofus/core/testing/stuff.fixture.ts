import { StuffDomainModel } from "@root/modules/dofus/core/model/stuff.domain-model";
import { StuffFactory } from "@root/modules/dofus/core/model/stuff.factory";


export const createStuffFixture = (
  overrides: Partial<StuffDomainModel.Stuff> = {}
): StuffDomainModel.Stuff => {
  return StuffFactory.create(overrides);
};
