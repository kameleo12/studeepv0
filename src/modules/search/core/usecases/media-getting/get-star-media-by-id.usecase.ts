import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export const getStarMediaById = createAppAsyncThunk<
  SearchDomainModel.TiktokMedia | undefined,
  { mediaId: string }
>("media/getStarMediaById", async ({ mediaId }, { extra }) => {
  const { tiktokMediasGateway } = extra;
  const media = await tiktokMediasGateway.getStarMediaById(mediaId);

  return media;
});
