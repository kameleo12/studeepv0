// @root/modules/dofus/react/stuff/StuffDetails.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@root/modules/store/store";
import { getStuffById } from "@root/modules/dofus/core/usecase/get-stuff-by-id.usecase";
import { AppState } from "@root/modules/store/app-state";
import SearchNavbar from "@root/modules/dofus/react/search/components/SearchNavbar";
import { motion } from "framer-motion";

export default function StuffDetails() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const searchId = searchParams.get("searchId") ?? "";

  const dispatch = useAppDispatch();

  const loading = useSelector((s: AppState) => s.currentStuff.loading);
  const stuff = useSelector((s: AppState) => s.currentStuff.stuff);

  useEffect(() => {
    if (id) {
      // Note: signature getById(stuffId, searchId)
      dispatch(getStuffById({ stuffId: String(id), searchId }));
    }
  }, [id, searchId, dispatch]);

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto p-6">
        <p className="text-gray-500">Chargement…</p>
      </section>
    );
  }

  if (!stuff) {
    return (
      <section className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-semibold">Stuff introuvable</h1>
        <p className="text-gray-500">
          Aucun élément avec l’id <code>{String(id)}</code>.
        </p>
      </section>
    );
    }

  return (
    <div className="navbar+section-container">
      <SearchNavbar />
    <section className="max-w-3xl mx-auto p-6">
      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <Image
            src={stuff.thumbnail}
            alt={`Stuff ${stuff.id}`}
            width={256}
            height={256}
            className="rounded-xl object-cover w-64 h-64"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">Stuff #{stuff.id}</h1>
          <p className="text-sm text-gray-500 mb-4">
            Uploaded: {new Date(stuff.uploadedAt).toLocaleString()}
          </p>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-500">Power</dt>
              <dd className="font-medium">{stuff.power}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Health</dt>
              <dd className="font-medium">{stuff.items.health}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-gray-500">Description</dt>
              <dd className="font-medium">{stuff.items.description}</dd>
            </div>
          </dl>

          <div className="mt-4">
            <Image
              src={stuff.items.thumbnail}
              alt={`Item of stuff ${stuff.id}`}
              width={256}
              height={256}
              className="rounded-lg object-cover w-48 h-48"
            />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
