"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@root/modules/store/store";
import { getLibrary } from "../../core/usecases/library-handling/get-library.usecase";
import { useParams } from "next/navigation";

export const useLibrary = () => {
  const params = useParams();
  const libraryId = Array.isArray(params.id) ? params.id[0] : params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (libraryId) {
      dispatch(getLibrary({ libraryId }));
    }
  }, [dispatch, libraryId]);
};
