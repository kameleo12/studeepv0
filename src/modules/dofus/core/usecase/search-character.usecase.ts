import { createAppAsyncThunk } from "../../../store/create-app-async-thunk";

export const searchCharacters = createAppAsyncThunk<
  { query: string; searchId: string },
  { query: string }
>("search/characters", async ({ query }, { extra }) => {
  const { charactersGateway } = extra;
  const res = await charactersGateway.searchByKeyword(query);
  return { query, searchId: res.searchId };
});
