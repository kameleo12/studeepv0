import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const addMediaToLibrary = createAppAsyncThunk<
  void,
  { libraryId: string; searchId: string; mediaId: string }
>(
  "library/addMediaToLibrary",
  async ({ libraryId, searchId, mediaId }, { extra }) => {
    const { libraryGateway } = extra;
    await libraryGateway.addMedia(libraryId, searchId, mediaId);
  }
);
