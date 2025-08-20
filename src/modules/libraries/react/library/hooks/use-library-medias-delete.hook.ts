"use client";

import { useState } from "react";
import { useAppDispatch } from "@root/modules/store/store";
import { removeMediaFromLibrary } from "@root/modules/libraries/core/usecases/media-in-library/remove-media-from-library.usecase";

export const useLibraryMediaDelete = (libraryId: string) => {
  const dispatch = useAppDispatch();
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);

  const toggleDeleteMode = () => {
    if (deleteMode) {
      if (selectedMediaIds.length > 0) {
        selectedMediaIds.forEach((mediaId) => {
          dispatch(removeMediaFromLibrary({ libraryId, mediaId }));
        });
      }
      setSelectedMediaIds([]);
      setDeleteMode(false);
    } else {
      setDeleteMode(true);
    }
  };

  const toggleSelectMedia = (mediaId: string) => {
    setSelectedMediaIds((prev) =>
      prev.includes(mediaId)
        ? prev.filter((id) => id !== mediaId)
        : [...prev, mediaId]
    );
  };

  return { deleteMode, selectedMediaIds, toggleDeleteMode, toggleSelectMedia };
};
