import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const renameLibrary = createAppAsyncThunk<
  void,
  { libraryId: string; newName: string }
>("library/renameLibrary", async ({ libraryId, newName }, { extra }) => {
  const { libraryGateway } = extra;
  await libraryGateway.renameLibrary(libraryId, newName);
});
