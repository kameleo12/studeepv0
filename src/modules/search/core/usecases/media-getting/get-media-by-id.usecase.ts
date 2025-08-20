import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export const getMediaById = createAppAsyncThunk<
  SearchDomainModel.TiktokMedia | undefined,
  { mediaId: string; searchId: string }
>("media/getMediaById", async ({ mediaId, searchId }, { extra }) => {
  const { tiktokMediasGateway } = extra;
  const media = await tiktokMediasGateway.getMediaById(mediaId, searchId);

  return media;
});
