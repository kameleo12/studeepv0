"use client";

import { createAppAsyncThunk } from "@root/modules/store/create-app-async-thunk";

export const fetchMediaBlob = createAppAsyncThunk<
  { playUrl: string; videoBlobUrl: string },
  { playUrl: string; cookie: string }
>("media/fetchMediaBlob", async ({ playUrl, cookie }, { extra }) => {
  const { tiktokMediasGateway } = extra;
  const blob = await tiktokMediasGateway.GetMediaBlob(playUrl, cookie);
  const videoBlobUrl = URL.createObjectURL(blob);
  return { playUrl, videoBlobUrl };
});
