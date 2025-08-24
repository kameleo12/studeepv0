"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { Copy } from "lucide-react";
import { CharacterDomainModel } from "../../../../dofus/core/model/stuff.domain-model";

export interface BaseCharacterItemProps {
  character: CharacterDomainModel.Character;
  isHovered: boolean;
  onCopyLink: (link: string) => void;
  extraActions?: ReactNode;
}

export function BaseCharacterItem({
  character,
  isHovered,
  onCopyLink,
  extraActions,
}: BaseCharacterItemProps) {
  const handleCopy = () => {
    // On laisse le parent fournir le lien précis (incluant éventuellement searchId)
    onCopyLink(window.location.href);
  };

  return (
    <div className="group relative flex flex-col gap-2">
      <div
        className={`relative w-[250px] overflow-hidden rounded-xl transition-all duration-300 hover:bg-gray-100 ${
          isHovered ? "ring-1 ring-gray-200 shadow-lg" : ""
        }`}
      >
        {/* Badge nom du personnage */}
        <div className="absolute left-2 top-2 z-20">
          <div className="rounded-lg bg-primary/90 px-3 py-1.5 text-sm font-bold text-black shadow-md">
            {character.name}
          </div>
        </div>

        <div className="relative block">
          <div className="overflow-hidden rounded-xl">
            <Image
              alt={character.name}
              width={300}
              height={500}
              src={character.thumbnail}
              className="h-[340px] w-[250px] object-cover"
              quality={80}
            />
          </div>

          {extraActions && (
            <div className="absolute right-16 top-0 z-30">{extraActions}</div>
          )}
        </div>

        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900">
            {character.name}
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-600">
            Sorts : {character.spells.length}
          </p>
        </div>
      </div>
    </div>
  );
}
