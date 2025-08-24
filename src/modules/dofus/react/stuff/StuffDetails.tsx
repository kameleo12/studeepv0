// @root/modules/dofus/react/stuff/StuffDetails.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import { AppState } from "../../../store/app-state";
import SearchNavbar from "../search/components/SearchNavbar";
import { motion } from "framer-motion";
import { getCharacterById } from "../../core/usecase/get-stuff-by-id.usecase";

export default function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const searchId = searchParams.get("searchId") ?? "";

  const dispatch = useAppDispatch();

  const loading = useSelector((s: AppState) => s.currentStuff.loading);
  const stuff = useSelector((s: AppState) => s.currentStuff.stuff);

  useEffect(() => {
    if (id) {
      // Note: signature getById(stuffId, searchId)
      dispatch(getCharacterById({ characterId: String(id), searchId }));
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
        <h1 className="text-xl font-semibold">Perso introuvable</h1>
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
              alt={stuff.id}
              width={256}
              height={256}
              className="rounded-xl object-cover w-64 h-64"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{stuff.name}</h1>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Sorts</h2>
              {stuff.spells.length === 0 ? (
                <p className="text-gray-500">Aucun sort.</p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {stuff.spells.map((spell) => (
                    <li key={spell.id} className="p-3 border rounded-lg">
                      {spell.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
