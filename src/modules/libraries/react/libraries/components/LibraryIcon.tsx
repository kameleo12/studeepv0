"use client";

import Image from "next/image";
import libraryImg from "@root/assets/images/library.png";

export function LibraryIcon({
  id,
  name,
  totalMedias,
}: {
  id: string;
  name: string;
  totalMedias: number;
}) {
  return (
    <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <Image
          src={libraryImg}
          alt="Library icon"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <div>
          <h3 className="font-medium truncate">{name}</h3>
          <p className="text-sm text-gray-500">{totalMedias} medias</p>
        </div>
      </div>
    </div>
  );
}
