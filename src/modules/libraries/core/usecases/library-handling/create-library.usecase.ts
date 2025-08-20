import { LibraryDomainModel } from "@root/modules/libraries/core/models/library.domain-model";
import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const createLibrary = createAppAsyncThunk<
  LibraryDomainModel.Library,
  { libraryId: string; name: string; medias?: LibraryDomainModel.TiktokMedia[] }
>("library/createLibrary", async ({ libraryId, name, medias }, { extra }) => {
  const { libraryGateway } = extra;
  await libraryGateway.createLibrary(libraryId, name, medias || []);
  return {
    id: libraryId,
    name,
    medias: medias || [],
  };
});
