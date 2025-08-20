import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const getQuerySuggestions = createAppAsyncThunk<
  string[],
  { input: string }
>("search/getSuggestions", async ({ input }, { extra }) => {
  const tiktokMediasGateway = extra.tiktokMediasGateway;
  const suggestions = await tiktokMediasGateway.getQuerySuggestions(input);
  return suggestions;
});
