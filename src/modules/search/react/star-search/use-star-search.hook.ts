import { useEffect } from "react";
import { getStarSearchResults } from "@root/modules/search/core/usecases/search-results/get-star-search-results.usecase";
import { useAppDispatch } from "@root/modules/store/store";

export const useStarSearch = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStarSearchResults());
  }, [dispatch]);
};
