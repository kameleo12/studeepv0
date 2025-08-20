import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { LibraryDomainModel } from "../../models/library.domain-model";

export const getLibrary = createAppAsyncThunk<
  LibraryDomainModel.Library | null,
  { libraryId: string }
>("library/getLibrary", async ({ libraryId }, { extra }) => {
  const { libraryGateway } = extra;
  const library = await libraryGateway.getLibrary(libraryId);
  return library;
});
