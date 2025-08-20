import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { LibraryDomainModel } from "../../models/library.domain-model";

export const getAllLibraries = createAppAsyncThunk<
  LibraryDomainModel.Library[],
  void
>("library/getAllLibraries", async (_, { extra }) => {
  const { libraryGateway } = extra;
  return await libraryGateway.getAllLibraries();
});
