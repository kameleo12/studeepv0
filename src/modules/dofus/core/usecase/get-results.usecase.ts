import { CharacterDomainModel } from "../model/stuff.domain-model";
import { createAppAsyncThunk } from "../../../store/create-app-async-thunk";

export const getCharacterResults = createAppAsyncThunk<
  CharacterDomainModel.Character[],
  { searchId: string }
>("search/getCharacterResults", async ({ searchId }, { extra }) => {
  const { charactersGateway } = extra;
  const results = await charactersGateway.getResults(searchId);
  return results;
});
