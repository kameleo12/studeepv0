import { createReducer } from "@reduxjs/toolkit";
import { SearchDomainModel } from "@root/modules/search/core/models/search.domain-model";
import { changeSearchType } from "@root/modules/search/core/usecases/search-settings/change-search-type.usecase";
import { getResults } from "@root/modules/search/core/usecases/search-results/get-results.usecase";
import { searchTiktokMedias } from "@root/modules/search/core/usecases/search-settings/search-tiktok-medias.usecase";
import { changeSortingOption } from "@root/modules/search/core/usecases/search-results/change-sorting-option.usecase";
import { resetSearch } from "@root/modules/search/core/usecases/search-settings/reset-search.usecase";
import { fetchMediaBlob } from "@root/modules/search/core/usecases/video-fetching/fetch-media-blob.usecase";
import { AppState } from "@root/modules/store/app-state";

export const tiktokMediasSearchingReducer = createReducer<
  AppState["tiktokMediasSearching"]
>(
  {
    results: [],
    loading: false,
    started: false,
    query: "",
    searchType: SearchDomainModel.SearchType.KEYWORD,
    searchId: "",
    sortOptions: "viralScore",
  },
  (builder) => {
    builder.addCase(searchTiktokMedias.fulfilled, (state, action) => {
      state.query = action.payload.query;
      state.searchId = action.payload.searchId;
    });
    builder.addCase(searchTiktokMedias.pending, (state, _) => {
      state.started = true;
      state.loading = true;
    });
    builder.addCase(changeSearchType, (state, action) => {
      state.searchType = action.payload;
    });
    builder.addCase(getResults.fulfilled, (state, action) => {
      state.results = action.payload;
      state.loading = false;
    });
    builder.addCase(changeSortingOption, (state, action) => {
      const sortOption = action.payload;
      return {
        ...state,
        sortOptions: sortOption,
        results: [...state.results].sort((a, b) => {
          if (sortOption === "viewsCount") {
            return b.viewsCount - a.viewsCount;
          } else {
            return b.viralScore - a.viralScore;
          }
        }),
      };
    });
    builder.addCase(resetSearch, (state) => {
      return {
        ...state,
        results: [],
        query: "",
        started: false,
        searchType: SearchDomainModel.SearchType.KEYWORD,
        searchId: "",
        sortOptions: "viralScore",
      };
    });
    builder.addCase(fetchMediaBlob.fulfilled, (state, action) => {
      const { playUrl, videoBlobUrl } = action.payload;
      const index = state.results.findIndex((m) => m.playUrl === playUrl);
      if (index !== -1) {
        state.results[index].blobUrl = videoBlobUrl;
      }
    });
  }
);
