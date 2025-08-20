import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const removeMediaFromLibrary = createAppAsyncThunk<
  void,
  { libraryId: string; mediaId: string }
>(
  "library/removeMediaFromLibrary",
  async ({ libraryId, mediaId }, { extra }) => {
    const { libraryGateway } = extra;
    await libraryGateway.removeMedia(libraryId, mediaId);
  }
);
