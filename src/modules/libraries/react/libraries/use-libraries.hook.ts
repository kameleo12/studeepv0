"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@root/modules/store/store";
import { getAllLibraries } from "@root/modules/libraries/core/usecases/library-handling/get-all-libraries.usecase";
import { createLibrary } from "@root/modules/libraries/core/usecases/library-handling/create-library.usecase";

export const useLibraries = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllLibraries());
  }, [dispatch]);

  const handleCreateLibrary = (name: string) => {
    const libraryId = crypto.randomUUID();

    dispatch(createLibrary({ libraryId, name })).then(() => {
      dispatch(getAllLibraries());
    });
  };

  return { handleCreateLibrary };
};
