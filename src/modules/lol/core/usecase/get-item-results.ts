import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";

export const getItemResults = createAppAsyncThunk<
  ItemDomainModel.Item[],
  { searchId: string }
>("lol/search/getItemResults", async ({ searchId }, { extra }) => {
  const { itemsGateway } = extra;
  const results = await itemsGateway.getResults(searchId);
  return results;
});
