"use client";

import { ItemDomainModel } from "@root/modules/lol/core/model/item.domain-model";
import { useState } from "react";

interface SearchItemProps {
  item: ItemDomainModel.Item;
  searchId?: string;
}

export function SearchItem({ item, searchId }: SearchItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {}
  };

  const href = `/lol/item/${item.id}${searchId ? `?searchId=${searchId}` : ""}`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={href} className="block">
        <article className="rounded-2xl border-2 border-gray-200 bg-white shadow hover:shadow-md transition p-4 w-[230px] h-[340px] mx-auto flex flex-col">
          <div className="flex-1 flex flex-col items-center text-center gap-3">
            <img
              src={item.icon}
              alt={item.name}
              className="w-24 h-24 rounded-xl object-contain bg-gray-50"
            />
            <h3 className="font-semibold text-lg line-clamp-2">{item.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-3">
              {item.description}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold">{item.price} PO</span>
          </div>
        </article>
      </a>
    </div>
  );
}
