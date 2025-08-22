"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { Copy } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StuffDomainModel } from "@root/modules/dofus/core/model/stuff.domain-model";


dayjs.extend(relativeTime);

export interface BaseStuffItemProps {
  stuff: StuffDomainModel.Stuff;
  isHovered: boolean;
  onCopyLink: (link: string) => void;
  extraActions?: ReactNode;
}

export function BaseStuffItem({
  stuff,
  isHovered,
  onCopyLink,
  extraActions,
}: BaseStuffItemProps) {

  return (
    <div className="group relative flex flex-col gap-2">
      <div className="relative w-[250px] overflow-hidden rounded-xl transition-all duration-300 hover:bg-gray-100">
        <div className="absolute left-2 top-2 z-20">
          <div className="rounded-lg bg-primary/90 px-3 py-1.5 text-sm font-bold text-white shadow-md">
            ⚡ {stuff.level}
          </div>
        </div>
        <div className="relative block">
          <div className="overflow-hidden rounded-xl">
            <Image
              alt={`Stuff ${stuff.id}`}
              width={300}
              height={500}
              src={stuff.thumbnail}
              className="h-[340px] w-[250px] object-cover"
              quality={80}
            />
          </div>
          {isHovered && (
            <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCopyLink(stuff.thumbnail);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-gray-100"
              >
                <Copy className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          )}
          {extraActions && (
            <div className="absolute right-16 top-0 z-30">{extraActions}</div>
          )}
        </div>
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900">
            {stuff.items.description}
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-600">
            level: {stuff.level}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            Health: {stuff.items.health}
          </p>
        </div>
      </div>
    </div>
  );
}
