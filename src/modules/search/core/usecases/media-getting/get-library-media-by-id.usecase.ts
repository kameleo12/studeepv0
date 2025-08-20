import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { LibraryDomainModel } from "../../../../libraries/core/models/library.domain-model";

export const getLibraryMediaById = createAppAsyncThunk<
  LibraryDomainModel.TiktokMedia | undefined,
  { mediaId: string; libraryId: string }
>("library/getLibraryMediaById", async ({ mediaId, libraryId }, { extra }) => {
  const { libraryGateway } = extra;
  const media = await libraryGateway.getMediaById(mediaId, libraryId);
  return media;
});
