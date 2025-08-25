import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const searchItems = createAppAsyncThunk<
  { query: string; searchId: string },
  { query: string }
>("lol/search/items", async ({ query }, { extra }) => {
  const { itemsGateway } = extra;
  const res = await itemsGateway.searchByKeyword(query);
  return { query, searchId: res.searchId };
});
