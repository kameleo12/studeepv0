import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const getResults = createAppAsyncThunk<
  SearchDomainModel.TiktokMedia[],
  { searchId: string }
>("search/getResults", async ({ searchId }, { extra }) => {
  const tiktokMediasGateway = extra.tiktokMediasGateway;
  const results = await tiktokMediasGateway.getResults(searchId);
  return results;
});
