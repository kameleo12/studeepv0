"use client";

import { useSorting } from "@root/modules/search/react/sorting/use-sorting.hook";

export default function SortingSwitch() {
  const { sortOption, setSortOption } = useSorting();

  return (
    <div className="flex items-center gap-2">
      <button
        className={`py-2 px-4 rounded-full border ${
          sortOption === "viewsCount"
            ? "bg-red-500 border-red-500 text-white"
            : "bg-white border-black text-black"
        }`}
        onClick={() => setSortOption("viewsCount")}
      >
        Views Count
      </button>
      <button
        className={`py-2 px-4 rounded-full border ${
          sortOption === "viralScore"
            ? "bg-red-500 border-red-500 text-white"
            : "bg-white border-black text-black"
        }`}
        onClick={() => setSortOption("viralScore")}
      >
        Viral Score
      </button>
    </div>
  );
}
