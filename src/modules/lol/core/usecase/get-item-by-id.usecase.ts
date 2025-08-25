import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";

export const getItemById = createAppAsyncThunk<
  ItemDomainModel.Item | undefined,
  { itemId: string; searchId: string }
>("lol/item/getById", async ({ itemId, searchId }, { extra }) => {
  const { itemsGateway } = extra;
  return itemsGateway.getById(itemId, searchId);
});
