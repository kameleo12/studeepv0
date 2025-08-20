import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export const getAuthorMostViral = createAppAsyncThunk<
  SearchDomainModel.TiktokMedia[],
  { secUid: string }
>("author/getAuthorMostViral", async ({ secUid }, { extra }) => {
  const tiktokMediasGateway = extra.tiktokMediasGateway;
  const medias = await tiktokMediasGateway.getAuthorMostViral(secUid);
  return medias;
});
