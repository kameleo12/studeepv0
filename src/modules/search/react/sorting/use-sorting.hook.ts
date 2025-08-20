import { useDispatch, useSelector } from "react-redux";
import { changeSortingOption } from "@root/modules/search/core/usecases/search-results/change-sorting-option.usecase";
import { AppState } from "@root/modules/store/app-state";

export const useSorting = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state: AppState) => {
    return state.tiktokMediasSearching.sortOptions;
  });

  const setSortOption = (option: "viewsCount" | "viralScore") => {
    dispatch(changeSortingOption(option));
  };

  return { sortOption, setSortOption };
};
