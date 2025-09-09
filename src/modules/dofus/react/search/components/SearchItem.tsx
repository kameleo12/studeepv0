"use client";


import { CharacterDomainModel } from "@root/modules/dofus/core/model/character.domain-model";
import { BaseCharacterItem } from "@root/modules/dofus/react/search/components/BaseStuffItem";

import { useState } from "react";

interface SearchCharacterItemProps {
  character: CharacterDomainModel.Character;
  searchId?: string;
}

export function SearchCharacterItem({
  character,
  searchId,
}: SearchCharacterItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {}
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={`/search-character/${character.id}${
          searchId ? `?searchId=${searchId}` : ""
        }`}
        className="block"
      >
        <BaseCharacterItem
          character={character}
          isHovered={isHovered}
          onCopyLink={handleCopyLink}
        />
      </a>
    </div>
  );
}
