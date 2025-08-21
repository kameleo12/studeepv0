import { StuffDomainModel } from "../model/stuff.domain-model";
import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const getStuffResults = createAppAsyncThunk<
  StuffDomainModel.Stuff[],
  { searchId: string }
>("search/getStuffResults", async ({ searchId }, { extra }) => {
  const { stuffsGateway } = extra;
  const results = await stuffsGateway.getResults(searchId);
  return results;
});
