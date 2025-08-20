import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export const getStarSearchResults = createAppAsyncThunk<
  SearchDomainModel.TiktokMedia[]
>("starSearch/getResults", async (_, { extra }) => {
  const tiktokMediasGateway = extra.tiktokMediasGateway;

  const results = await tiktokMediasGateway.getStarSearchResults();
  return results;
});
