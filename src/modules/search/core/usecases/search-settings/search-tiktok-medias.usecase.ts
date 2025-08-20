import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const searchTiktokMedias = createAppAsyncThunk<
  { query: string; searchId: string },
  { query: string }
>("search/tiktokMedias", async ({ query }, { extra }) => {
  const tiktokMediasGateway = extra.tiktokMediasGateway;

  const tiktokMedias = await tiktokMediasGateway.searchByKeyword(query);

  return { query, searchId: tiktokMedias.searchId };
});
