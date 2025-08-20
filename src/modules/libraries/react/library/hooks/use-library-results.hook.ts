"use client";

import { useSelector } from "react-redux";
import { selectCurrentLibrary } from "../../../core/selectors/current-library.selector";
import { useEffect, useState } from "react";

export const useLibraryResults = () => {
  const { hasLibrary, isLoading, libraryName, libraryId, medias } =
    useSelector(selectCurrentLibrary);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!isLoading && initialLoad) {
      setInitialLoad(false);
    }
  }, [isLoading, initialLoad]);

  return {
    hasLibrary,
    isLoading: initialLoad || isLoading,
    libraryName,
    libraryId,
    medias,
  };
};
