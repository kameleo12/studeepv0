import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const deleteLibrary = createAppAsyncThunk<void, { libraryId: string }>(
  "library/deleteLibrary",
  async ({ libraryId }, { extra }) => {
    const { libraryGateway } = extra;
    await libraryGateway.deleteLibrary(libraryId);
  }
);
