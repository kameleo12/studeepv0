import { useEffect, useRef } from "react";
import { useAppDispatch } from "@root/modules/store/store";
import { useSelector } from "react-redux";
import { getMediaById } from "@root/modules/search/core/usecases/media-getting/get-media-by-id.usecase";
import { getAuthorMostViral } from "@root/modules/search/core/usecases/author-most-viral/get-author-most-viral.usecase";
import {
  selectCurrentMedia,
  selectCurrentMediaLoading,
} from "../../core/selectors/current-media.selector";

export const useMediaById = (id: string, searchId: string) => {
  const dispatch = useAppDispatch();
  const currentMedia = useSelector(selectCurrentMedia);
  const loading = useSelector(selectCurrentMediaLoading);
  const previousMediaIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!id || !searchId) return;

    if (previousMediaIdRef.current === id) return;

    previousMediaIdRef.current = id;
    dispatch(getMediaById({ mediaId: id, searchId }));
  }, [id, searchId, dispatch]);

  useEffect(() => {
    if (!currentMedia || currentMedia.id !== id) return;

    dispatch(getAuthorMostViral({ secUid: currentMedia.secUid }));
  }, [currentMedia, id, dispatch]);

  return { currentMedia, loading };
};
