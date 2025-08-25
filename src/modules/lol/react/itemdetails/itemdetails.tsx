"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { useAppDispatch } from "@root/modules/store/store";
import { AppState } from "@root/modules/store/app-state";

import { getItemById } from "@root/modules/lol/core/usecase/get-item-by-id.usecase";
import { ITEM_STAT_LABELS } from "@root/modules/lol/core/model/item.domain-model";

export default function ItemDetails() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const searchParams = useSearchParams();

  const itemId = params?.id as string;
  const searchId = searchParams.get("searchId") ?? "";

  const { item, loading } = useSelector((s: AppState) => s.currentLolItem);

  useEffect(() => {
    if (itemId && searchId) {
      dispatch(getItemById({ itemId, searchId }));
    }
  }, [dispatch, itemId, searchId]);

  if (loading || !item) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6">
        <p className="text-gray-600">Chargement…</p>
      </div>
    );
  }

  const statsEntries = Object.entries(item.stats) as Array<
    [keyof typeof item.stats, number]
  >;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
      {/* Header: visuel + titre + prix */}
      <section className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
        <img
          src={item.icon}
          alt={item.name}
          className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-gray-50 object-contain shadow"
        />
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-extrabold">{item.name}</h1>
          <p className="mt-1 text-gray-500">{item.description}</p>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center rounded-xl border px-3 py-1.5 font-semibold bg-white">
            {item.price} PO
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Statistiques</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {statsEntries
            .filter(([, val]) => !!val)
            .map(([key, val]) => (
              <motion.div
                key={key as string}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border bg-white p-3 shadow-sm"
              >
                <p className="text-xs text-gray-500">{ITEM_STAT_LABELS[key]}</p>
                <p className="text-base font-semibold">
                  {formatStatValue(key as keyof typeof item.stats, val)}
                  {suffixFor(key as keyof typeof item.stats)}
                </p>
              </motion.div>
            ))}
        </div>

        {statsEntries.every(([, v]) => !v) && (
          <p className="text-sm text-gray-500 mt-2">
            Aucune statistique fournie.
          </p>
        )}
      </section>
    </div>
  );
}

function suffixFor(key: keyof ReturnType<typeof getDummyStats>): string {
  // ajoute un suffix pertinent pour certaines stats
  switch (key) {
    case "attackSpeed":
    case "movementSpeed":
      return " %";
    default:
      return "";
  }
}

// helper pour typer le switch proprement
function getDummyStats() {
  return {
    AP: 0,
    AD: 0,
    PV: 0,
    RM: 0,
    R: 0,
    abilityHaste: 0,
    attackSpeed: 0,
    movementSpeed: 0,
  };
}

function formatStatValue(
  key: keyof ReturnType<typeof getDummyStats>,
  val: number
) {
  // si tu veux des formats spécifiques (ex: PV avec “+”), adapte ici
  const plus = val > 0 ? "+" : "";
  switch (key) {
    case "AP":
    case "AD":
    case "PV":
    case "RM":
    case "R":
    case "abilityHaste":
      return `${plus}${val}`;
    case "attackSpeed":
    case "movementSpeed":
      return `${plus}${val}`;
    default:
      return String(val);
  }
}
