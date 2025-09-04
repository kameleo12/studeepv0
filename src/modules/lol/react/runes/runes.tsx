// modules/lol/react/runes/RunesPage.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Card from "./components/Card";
import {
  RunePathKey,
  RuneTierId,
  ShardTierId,
  RuneBuild,
} from "@root/modules/lol/core/model/runes.model";
import {
  initialSelectedByTier,
  initialSelectedSecondaryByTier,
  initialSelectedShards,
  resetAllRunes,
  pickOption,
  pickSecondaryOption,
  pickShard,
} from "@root/modules/lol/core/usecase/runes.usecase";
import {
  RUNE_PATHS,
  SHARD_TIERS,
} from "@root/modules/lol/gateways-impl/in-memory-runes.gateway";

// ⬇️ Étape 4 : imports presets (usecases + gateway localStorage)
import {
  makeRuneBuild,
  applyRuneBuild,
} from "@root/modules/lol/core/usecase/rune-presets.usecase";
import { runePresetsGateway } from "@root/modules/lol/gateways-impl/localstorage/rune-preset.local";


export default function RunesPage() {
  // Primaire
  const [selectedPath, setSelectedPath] = useState<RunePathKey | null>(null);
  const [selectedByTier, setSelectedByTier] = useState<
    Record<RuneTierId, string | null>
  >(initialSelectedByTier());

  // Secondaire
  const [selectedSecondaryPath, setSelectedSecondaryPath] =
    useState<RunePathKey | null>(null);
  const [selectedSecondaryByTier, setSelectedSecondaryByTier] = useState<
    Record<Exclude<RuneTierId, "keystone">, string | null>
  >(initialSelectedSecondaryByTier());

  // Shards
  const [selectedShards, setSelectedShards] = useState<
    Record<ShardTierId, string | null>
  >(initialSelectedShards());

  // ⬇️ Étape 4 : états UI pour presets
  const [presetName, setPresetName] = useState("");
  const [presets, setPresets] = useState<RuneBuild[]>([]);

  useEffect(() => {
    // Charge la liste au montage
    setPresets(runePresetsGateway.list());
  }, []);

  const refreshPresets = () => setPresets(runePresetsGateway.list());

  const handleSavePreset = () => {
    if (!presetName.trim()) return;
    const build = makeRuneBuild({
      name: presetName.trim(),
      primaryPath: selectedPath,
      selectedByTier,
      secondaryPath: selectedSecondaryPath,
      selectedSecondaryByTier,
      selectedShards,
    });
    runePresetsGateway.save(build); // upsert (nouveau si pas d'id)
    setPresetName("");
    refreshPresets();
  };

  const handleLoadPreset = (p: RuneBuild) => {
    const next = applyRuneBuild(p);
    setSelectedPath(next.path);
    setSelectedSecondaryPath(next.secondaryPath);
    setSelectedByTier(next.selectedByTier);
    setSelectedSecondaryByTier(next.selectedSecondaryByTier);
    setSelectedShards(next.selectedShards);
  };

  const handleDeletePreset = (id: string) => {
    runePresetsGateway.remove(id);
    refreshPresets();
  };

  const currentPath = useMemo(
    () => RUNE_PATHS.find((p) => p.key === selectedPath) ?? null,
    [selectedPath]
  );
  const currentSecondaryPath = useMemo(
    () => RUNE_PATHS.find((p) => p.key === selectedSecondaryPath) ?? null,
    [selectedSecondaryPath]
  );

  /** ---- Handlers ---- */
  const handlePickPath = (key: RunePathKey) => {
    setSelectedPath(key);
    setSelectedByTier(initialSelectedByTier());
    if (selectedSecondaryPath === key) {
      setSelectedSecondaryPath(null);
      setSelectedSecondaryByTier(initialSelectedSecondaryByTier());
    }
  };

  const handlePickSecondaryPath = (key: RunePathKey) => {
    if (key === selectedPath) return;
    setSelectedSecondaryPath(key);
    setSelectedSecondaryByTier(initialSelectedSecondaryByTier());
  };

  const handlePickOption = (tier: RuneTierId, optionId: string) =>
    setSelectedByTier((prev) => pickOption(prev, tier, optionId));

  const handlePickSecondaryOption = (
    tier: Exclude<RuneTierId, "keystone">,
    optionId: string
  ) =>
    setSelectedSecondaryByTier((prev) =>
      pickSecondaryOption(prev, tier, optionId)
    );

  const handlePickShard = (tier: ShardTierId, optionId: string) =>
    setSelectedShards((prev) => pickShard(prev, tier, optionId));

  // Bouton global reset
  const handleResetAll = () => {
    const init = resetAllRunes();
    setSelectedPath(init.path);
    setSelectedSecondaryPath(init.secondaryPath);
    setSelectedByTier(init.selectedByTier);
    setSelectedSecondaryByTier(init.selectedSecondaryByTier);
    setSelectedShards(init.selectedShards);
  };

  /** ---- Résumé ---- */
  const summary = useMemo(() => {
    if (!currentPath) return null;

    const picksPrimary = currentPath.tiers.map((t) => {
      const o = t.options.find((o) => o.id === selectedByTier[t.id]);
      return { tier: t.label, option: o?.name ?? "—" };
    });

    const picksSecondary = currentSecondaryPath
      ? currentSecondaryPath.tiers
          .filter((t) => t.id !== "keystone")
          .map((t) => {
            const o = t.options.find(
              (o) =>
                o.id ===
                selectedSecondaryByTier[t.id as "slot1" | "slot2" | "slot3"]
            );
            return { tier: t.label, option: o?.name ?? "—" };
          })
      : [];

    const shards = SHARD_TIERS.map((t) => {
      const o = t.options.find((o) => o.id === selectedShards[t.id]);
      return { tier: t.label, option: o?.name ?? "—" };
    });

    return {
      path: currentPath.name,
      secondaryPath: currentSecondaryPath?.name ?? "—",
      picksPrimary,
      picksSecondary,
      shards,
    };
  }, [
    currentPath,
    currentSecondaryPath,
    selectedByTier,
    selectedSecondaryByTier,
    selectedShards,
  ]);

  /** ---------- Render ---------- */
  return (
    <section className="w-full py-8">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-extrabold text-center leading-tight mb-6"
      >
        Page Runes
      </motion.h1>

      {/* ====== 1) BRANCHE PRINCIPALE ====== */}
      <div className="w-full">
        <div className="mx-auto max-w-7xl overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-[900px] flex flex-row items-stretch justify-center gap-3 px-4">
            {RUNE_PATHS.map((path) => (
              <div key={path.key} className="w-[180px]">
                <Card
                  active={selectedPath === path.key}
                  onClick={() => handlePickPath(path.key)}
                  ariaLabel={`Choisir ${path.name} (principale)`}
                >
                  <div className="text-center transition-colors duration-200">
                    <div className="text-sm font-semibold">{path.name}</div>
                    <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                      {path.tagline}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== 2) ARBORESCENCE PRINCIPALE ====== */}
      <AnimatePresence initial={false}>
        {currentPath && (
          <motion.div
            key={`primary-${currentPath.key}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            <div className="mx-auto w-11/12 max-w-xl">
              <div className="rounded-xl p-3 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
                <div className="mb-3 text-center">
                  <h2 className="text-lg font-bold">
                    {currentPath.name} — Branche principale
                  </h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Keystone + 3 slots (1 choix par slot).
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {currentPath.tiers.map((tier) => (
                    <div key={tier.id} className="flex flex-col">
                      <div className="text-xs font-semibold mb-2 text-center">
                        {tier.label}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {tier.options.map((opt) => {
                          const active = selectedByTier[tier.id] === opt.id;
                          return (
                            <Card
                              key={opt.id}
                              active={active}
                              ariaLabel={`Choisir ${opt.name} pour ${tier.label}`}
                              onClick={() => handlePickOption(tier.id, opt.id)}
                            >
                              <div className="flex items-center gap-3 min-w-0 transition-colors duration-200">
                                {opt.thumbnail && (
                                  <img
                                    src={opt.thumbnail}
                                    alt={opt.name}
                                    loading="lazy"
                                  />
                                )}
                                <div className="min-w-0">
                                  <div className="font-medium text-sm truncate">
                                    {opt.name}
                                  </div>
                                  {opt.description && (
                                    <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                      {opt.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== 3) BRANCHE SECONDAIRE ====== */}
      {selectedPath && (
        <div className="w-full mt-8">
          <div className="mx-auto max-w-7xl overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="min-w-[900px] flex flex-row items-stretch justify-center gap-3 px-4">
              {RUNE_PATHS.map((path) => (
                <div key={path.key} className="w-[180px]">
                  <Card
                    active={selectedSecondaryPath === path.key}
                    disabled={path.key === selectedPath}
                    onClick={() => handlePickSecondaryPath(path.key)}
                    ariaLabel={`Choisir ${path.name} (secondaire)`}
                  >
                    <div className="text-center transition-colors duration-200">
                      <div className="text-sm font-semibold">{path.name}</div>
                      <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
                        {path.key === selectedPath
                          ? "Déjà en principale"
                          : "Secondaire"}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====== 4) ARBORESCENCE SECONDAIRE ====== */}
      <AnimatePresence initial={false}>
        {selectedSecondaryPath && currentSecondaryPath && (
          <motion.div
            key={`secondary-${currentSecondaryPath.key}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            <div className="mx-auto w-11/12 max-w-xl">
              <div className="rounded-xl p-3  bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
                <div className="mb-3 text-center">
                  <h2 className="text-lg font-bold">
                    {currentSecondaryPath.name} — Branche secondaire
                  </h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Choisissez <span className="font-semibold">2 runes</span> au
                    total sur slots 1/2/3 (max{" "}
                    <span className="font-semibold">1 par slot</span>).
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {currentSecondaryPath.tiers
                    .filter((t) => t.id !== "keystone")
                    .map((tier) => (
                      <div key={tier.id} className="flex flex-col">
                        <div className="text-xs font-semibold mb-2 text-center">
                          {tier.label}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {tier.options.map((opt) => {
                            const active =
                              selectedSecondaryByTier[
                                tier.id as "slot1" | "slot2" | "slot3"
                              ] === opt.id;
                            const alreadyPicked = Boolean(
                              selectedSecondaryByTier[
                                tier.id as "slot1" | "slot2" | "slot3"
                              ]
                            );
                            const count = Object.values(
                              selectedSecondaryByTier
                            ).filter(Boolean).length;
                            const disabled =
                              !active && (alreadyPicked || count >= 2);
                            return (
                              <Card
                                key={opt.id}
                                active={active}
                                disabled={disabled}
                                ariaLabel={`Choisir ${opt.name} pour ${tier.label} (secondaire)`}
                                onClick={() =>
                                  handlePickSecondaryOption(
                                    tier.id as "slot1" | "slot2" | "slot3",
                                    opt.id
                                  )
                                }
                              >
                                <div className="flex items-center gap-3 min-w-0 transition-colors duration-200">
                                  {opt.thumbnail && (
                                    <img
                                      src={opt.thumbnail}
                                      alt={opt.name}
                                      loading="lazy"
                                    />
                                  )}
                                  <div className="min-w-0">
                                    <div className="font-medium text-sm truncate">
                                      {opt.name}
                                    </div>
                                    {opt.description && (
                                      <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                        {opt.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== 5) SHARDS ====== */}
      <div className="mt-8">
        <div className="mx-auto w-11/12 max-w-xl">
          <div className="rounded-xl p-3 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
            <h3 className="text-base font-semibold mb-2 text-center">
              Shards (statistiques complémentaires)
            </h3>
            <div className="flex flex-col gap-4">
              {SHARD_TIERS.map((tier) => (
                <div key={tier.id} className="flex flex-col">
                  <div className="text-xs font-semibold mb-2 text-center">
                    {tier.label}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {tier.options.map((opt) => {
                      const active = selectedShards[tier.id] === opt.id;
                      return (
                        <Card
                          key={opt.id}
                          active={active}
                          ariaLabel={`Choisir ${opt.name} pour ${tier.label}`}
                          onClick={() => handlePickShard(tier.id, opt.id)}
                        >
                          <div className="flex items-center gap-3 min-w-0 transition-colors duration-200">
                            {opt.thumbnail && (
                              <img
                                src={opt.thumbnail}
                                alt={opt.name}
                                loading="lazy"
                              />
                            )}
                            <div className="min-w-0">
                              <div className="font-medium text-sm truncate">
                                {opt.name}
                              </div>
                              {opt.description && (
                                <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                  {opt.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====== 6) RÉSUMÉ ====== */}
      <div className="mt-6">
        <div className="mx-auto w-11/12 max-w-xl">
          <div className="rounded-xl p-3 ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800 text-sm">
            <div className="font-semibold mb-2 text-center">Résumé</div>
            {summary ? (
              <>
                <ul className="mb-2 text-center space-y-1">
                  <li>
                    <span className="font-medium">Branche principale :</span>{" "}
                    {summary.path}
                  </li>
                  {summary.picksPrimary.map((p) => (
                    <li key={`p-${p.tier}`}>
                      <span className="font-medium">{p.tier} :</span> {p.option}
                    </li>
                  ))}
                </ul>
                <ul className="mb-2 text-center space-y-1">
                  <li>
                    <span className="font-medium">Branche secondaire :</span>{" "}
                    {summary.secondaryPath}
                  </li>
                  {summary.picksSecondary.map((p) => (
                    <li key={`s-${p.tier}`}>
                      <span className="font-medium">{p.tier} :</span> {p.option}
                    </li>
                  ))}
                </ul>
                <ul className="text-center space-y-1">
                  <li className="font-medium">Shards :</li>
                  {summary.shards.map((s) => (
                    <li key={`sh-${s.tier}`}>
                      <span className="font-medium">{s.tier} :</span>{" "}
                      {s.option}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="px-2.5 py-1.5 rounded-lg cursor-pointer 
             transition-shadow transition-transform duration-300 ease-out
             hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                  >
                    Réinitialiser toutes les runes
                  </button>
                </div>
              </>
            ) : (
              <div className="text-neutral-600 dark:text-neutral-400 text-center">
                Sélectionnez une branche pour commencer.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-xl mb-6">
        <div className="rounded-xl p-3 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
          <h3 className="text-base font-semibold mb-2 text-center">Presets</h3>

          <div className="flex gap-2">
            <input
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Nom de la page de rune (ex: Ezreal - poke)"
              className="flex-1 rounded-md px-3 py-2 text-sm ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 bg-transparent"
              aria-label="Nom du preset"
            />
            <button
              type="button"
              onClick={handleSavePreset}
              disabled={!presetName.trim()}
              className="rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 hover:shadow-sm disabled:opacity-50"
            >
              Enregistrer
            </button>
          </div>

          {presets.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {presets
                .slice()
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {p.name}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                        {p.primaryPath ?? "—"} · {p.secondaryPath ?? "—"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoadPreset(p)}
                        className="rounded-md px-2 py-1 text-xs ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700"
                      >
                        Charger
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePreset(p.id)}
                        className="rounded-md px-2 py-1 text-xs ring-1 ring-inset ring-red-300 dark:ring-red-700 text-red-600 dark:text-red-400"
                      >
                        Suppr
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 text-center">
              Aucun preset enregistré.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
