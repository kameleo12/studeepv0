// @root/modules/dofus/core/usecase/search-stuffs.usecase.ts
import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const searchStuffs = createAppAsyncThunk<
  { query: string; searchId: string },
  { query: string }
>("search/stuffs", async ({ query }, { extra }) => {
  const { stuffsGateway } = extra;
  const res = await stuffsGateway.searchByKeyword(query);
  return { query, searchId: res.searchId };
});
