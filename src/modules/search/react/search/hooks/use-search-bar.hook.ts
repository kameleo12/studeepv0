import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { selectSearchType } from "@root/modules/search/core/selectors/search-type.selector";
import { changeSearchType } from "@root/modules/search/core/usecases/search-settings/change-search-type.usecase";
import { useAppDispatch } from "@root/modules/store/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "@root/modules/shared/react/hooks/use-translation.hook";
import { AppState } from "@root/modules/store/app-state";

export const useSearchBar = ({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) => {
  const { t } = useTranslation("search");

  const globalQuery = useSelector(
    (state: AppState) => state.tiktokMediasSearching.query
  );

  const [query, setQuery] = useState(globalQuery);

  const dispatch = useAppDispatch();

  const searchTypeVM = useSelector(selectSearchType);

  useEffect(() => {
    setQuery(globalQuery);
  }, [globalQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onChangeSearchType = (searchType: SearchDomainModel.SearchType) => {
    if (!searchTypeVM.canChange) {
      toast.error(t("searchbar.error.cannotChangeSearchType"));
      return;
    }

    dispatch(changeSearchType(searchType));
  };

  return {
    query,
    setQuery,
    searchType: searchTypeVM.value,
    handleSubmit,
    handleQueryChange,
    onChangeSearchType,
  };
};
