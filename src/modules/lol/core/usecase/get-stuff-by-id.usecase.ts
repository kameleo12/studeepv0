import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { StuffDomainModel } from "../model/stuff.domain-model";

export const getStuffById = createAppAsyncThunk<
  StuffDomainModel.Stuff | undefined,
  { stuffId: string; searchId: string }
>(
  "stuff/getStuffById",
  async ({ stuffId, searchId }, { extra }) => {
    const { stuffsGateway } = extra;
    const stuff = await stuffsGateway.getById(stuffId, searchId);
    return stuff;
  }
);
