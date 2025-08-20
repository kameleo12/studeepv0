"use client";

import { useSelector } from "react-redux";
import {
  selectLibrariesList,
  selectLibrariesLoading,
} from "@root/modules/libraries/core/selectors/all-libraries.selector";

export const useLibrariesList = () => {
  const libraries = useSelector(selectLibrariesList);
  const isLoading = useSelector(selectLibrariesLoading);

  return {
    libraries,
    isLoading,
  };
};
