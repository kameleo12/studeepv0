import { useSelector, shallowEqual } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "@root/modules/store/app-state";
import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";

type ItemSearchVM = {
  items: ItemDomainModel.Item[];
  hasStarted: boolean;
  isLoading: boolean;
  searchId: string;
};

const fallback: ItemSearchVM = {
  items: [],
  hasStarted: false,
  isLoading: false,
  searchId: "",
};

const selectLolSlice = (state: AppState) => state.lolItemsSearching;

const selectItemSearchResults = createSelector(
  [selectLolSlice],
  (s): ItemSearchVM =>
    s
      ? {
          items: (s.results ?? []) as ItemDomainModel.Item[],
          hasStarted: !!s.started,
          isLoading: !!s.loading,
          searchId: s.searchId ?? "",
        }
      : fallback
);

export const useSearchResultsItems = () =>
  useSelector(selectItemSearchResults, shallowEqual);
