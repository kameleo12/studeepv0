import { useDispatch } from "react-redux";
import { resetSearch } from "@root/modules/search/core/usecases/search-settings/reset-search.usecase";

export const useResetSearch = () => {
  const dispatch = useDispatch();

  const handleResetSearch = () => {
    dispatch(resetSearch());
  };

  return { handleResetSearch };
};
