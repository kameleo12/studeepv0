import { useEffect, useRef } from "react";
import { useAppDispatch } from "@root/modules/store/store";
import { useSelector } from "react-redux";
import { getLibraryMediaById } from "@root/modules/search/core/usecases/media-getting/get-library-media-by-id.usecase";
import { getAuthorMostViral } from "@root/modules/search/core/usecases/author-most-viral/get-author-most-viral.usecase";
import {
  selectCurrentMedia,
  selectCurrentMediaLoading,
} from "@root/modules/search/core/selectors/current-media.selector";

export const useLibraryMediaById = (mediaId: string, libraryId: string) => {
  const dispatch = useAppDispatch();
  const currentMedia = useSelector(selectCurrentMedia);
  const loading = useSelector(selectCurrentMediaLoading);
  const previousMediaIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!libraryId || !mediaId) return;

    if (previousMediaIdRef.current === mediaId) return;

    previousMediaIdRef.current = mediaId;
    dispatch(getLibraryMediaById({ mediaId, libraryId }));
  }, [libraryId, mediaId, dispatch]);

  useEffect(() => {
    if (!currentMedia || currentMedia.id !== mediaId) return;

    dispatch(getAuthorMostViral({ secUid: currentMedia.secUid }));
  }, [currentMedia, mediaId, dispatch]);

  return {
    currentMedia,
    loading,
  };
};
