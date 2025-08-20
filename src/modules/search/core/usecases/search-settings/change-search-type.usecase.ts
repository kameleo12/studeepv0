import { createAction } from "@reduxjs/toolkit";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";

export const changeSearchType = createAction<SearchDomainModel.SearchType>(
  "search/changeSearchType"
);
