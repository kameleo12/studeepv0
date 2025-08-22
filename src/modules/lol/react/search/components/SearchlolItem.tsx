// @root/modules/search/react/components/SearchStuffItem.tsx
"use client";

import { StuffDomainModel } from "@root/modules/dofus/core/model/stuff.domain-model";
import { BaseStuffItem } from "@root/modules/shared/react/components/ui/BaseStuffItem";
import { useState } from "react";


interface SearchStuffItemProps {
  stuff: StuffDomainModel.Stuff;
  searchId?: string;
}

export function SearchStuffItem({ stuff, searchId }: SearchStuffItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={`/search-stuff/${stuff.id}${searchId ? `?searchId=${searchId}` : ""}`}
        className="block"
      >
        <BaseStuffItem
          stuff={stuff}
          isHovered={isHovered}
          onCopyLink={handleCopyLink}
        />
      </a>
    </div>
  );
}
