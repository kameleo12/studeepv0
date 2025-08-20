import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { TiktokMediaFactory } from "@root/modules/search/core/models/tiktok-media.factory";

export const createTiktokMediaFixture = (
  overrides: Partial<SearchDomainModel.TiktokMedia>
): SearchDomainModel.TiktokMedia => {
  return TiktokMediaFactory.create(overrides);
};
