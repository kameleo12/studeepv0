import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const reorderLibraryMedias = createAppAsyncThunk<
  void,
  { libraryId: string; newOrder: string[] }
>(
  "library/reorderLibraryMedias",
  async ({ libraryId, newOrder }, { extra }) => {
    const { libraryGateway } = extra;
    await libraryGateway.reorderMedias(libraryId, newOrder);
  }
);
