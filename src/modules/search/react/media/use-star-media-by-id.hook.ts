import { useEffect, useRef } from "react";
import { useAppDispatch } from "@root/modules/store/store";
import { useSelector } from "react-redux";
import { getStarMediaById } from "@root/modules/search/core/usecases/media-getting/get-star-media-by-id.usecase";
import { getAuthorMostViral } from "@root/modules/search/core/usecases/author-most-viral/get-author-most-viral.usecase";
import {
  selectCurrentMedia,
  selectCurrentMediaLoading,
} from "../../core/selectors/current-media.selector";

export const useStarMediaById = (id: string) => {
  const dispatch = useAppDispatch();
  const currentMedia = useSelector(selectCurrentMedia);
  const loading = useSelector(selectCurrentMediaLoading);
  const previousMediaIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!id) return;

    if (previousMediaIdRef.current === id) return;

    previousMediaIdRef.current = id;
    dispatch(getStarMediaById({ mediaId: id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (!currentMedia || currentMedia.id !== id) return;

    dispatch(getAuthorMostViral({ secUid: currentMedia.secUid }));
  }, [currentMedia, id, dispatch]);

  return { currentMedia, loading };
};
