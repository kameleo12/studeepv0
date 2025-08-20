import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export class TiktokAuthorFactory {
  static create(
    overrides?: Partial<SearchDomainModel.TiktokAuthor>
  ): SearchDomainModel.TiktokAuthor {
    return {
      username: "John Doe",
      followersCount: 1_000_000,
      secUid: "secUid1",
      ...overrides,
    };
  }
}
