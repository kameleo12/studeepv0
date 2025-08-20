// @root/modules/search/core/selectors/current-stuff.selector.ts
import { createSelector } from "@reduxjs/toolkit";
import { StuffDomainModel } from "../model/stuff.domain-model";
import { AppState } from "@root/modules/store/app-state";

/** Slice selector */
export const selectCurrentStuffState = (state: AppState) => state.currentStuff;

/** Données principales */
export const selectCurrentStuff = (state: AppState): StuffDomainModel.Stuff | null =>
  state.currentStuff.stuff;

export const selectCurrentStuffLoading = (state: AppState): boolean =>
  state.currentStuff.loading;

/** Dérivés pratiques */
export const selectCurrentStuffId = createSelector(
  selectCurrentStuff,
  (stuff) => stuff?.id ?? null
);

export const selectCurrentStuffThumbnail = createSelector(
  selectCurrentStuff,
  (stuff) => stuff?.thumbnail ?? null
);

export const selectCurrentStuffUploadedAt = createSelector(
  selectCurrentStuff,
  (stuff) => stuff?.uploadedAt ?? null
);

export const selectCurrentStuffPower = createSelector(
  selectCurrentStuff,
  (stuff) => stuff?.power ?? null
);

export const selectCurrentStuffItems = createSelector(
  selectCurrentStuff,
  (stuff) => stuff?.items ?? null
);

/** Exemple de mémo pour une vue “détail” compacte */
export const selectCurrentStuffViewModel = createSelector(
  selectCurrentStuff,
  (stuff) =>
    stuff
      ? {
          id: stuff.id,
          uploadedAt: stuff.uploadedAt,
          thumbnail: stuff.thumbnail,
          power: stuff.power,
          itemThumbnail: stuff.items.thumbnail,
          itemPower: stuff.items.power,
          itemHealth: stuff.items.health,
          itemDescription: stuff.items.description,
        }
      : null
);
