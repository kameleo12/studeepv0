import { createAction } from "@reduxjs/toolkit";

export const changeSortingOption = createAction<"viewsCount" | "viralScore">(
  "tiktokMediasSorting/changeSortingOption"
);
