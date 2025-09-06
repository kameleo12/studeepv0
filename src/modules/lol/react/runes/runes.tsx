// modules/lol/react/runes/RunesPage.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRunesState } from "./hooks/useRunesState";
import { PathScroller } from "./components/PathScroller";
import { TierGrid } from "./components/TierGrid";
import { SummaryPanel } from "./components/SummaryPanel";
import { PresetsPanel } from "./components/PresetsPanel";
import Image from "next/image";



export default function RunesPage() {
  const {
    // data
    RUNE_PATHS,
    SHARD_TIERS,
    currentPath,
    currentSecondaryPath,

    // state
    selectedPath,
    selectedByTier,
    selectedSecondaryPath,
    selectedSecondaryByTier,
    selectedShards,

    // handlers
    pickPath,
    pickSecondaryPath,
    pickPrimaryOption,
    pickSecondaryRune,
    pickShardOption,
    resetAll,

    // presets
    presets,
    presetName,
    setPresetName,
    savePreset,
    loadPreset,
    deletePreset,

    // edit mode
    editingPresetId,
    startEditPreset,
    cancelEditPreset,
    saveEditedPreset,

    // derived
    summary,
  } = useRunesState();

  return (
    <section className="relative w-full min-h-screen py-8">
           <Image
        src="/images/bg-rune-img.jpg" // place ton fichier dans /public/images/runes-bg.jpg
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover fixed inset-0 -z-10 pointer-events-none"
      />
      {/* Overlay lisibilité */}
      <div className="fixed inset-0 -z-10 pointer-events-none" />
      
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-5xl font-extrabold text-center leading-tight mb-6 text-white tracking-wide drop-shadow-lg"
      >
        Page Runes
      </motion.h1>

      {/* Presets */}
      <div className="mx-auto w-11/12 max-w-xl mb-6">
        <PresetsPanel
          presetName={presetName}
          setPresetName={setPresetName}
          presets={presets}
          onSave={savePreset}
          onLoad={loadPreset}
          onDelete={deletePreset}
          /* --- props édition --- */
          editingPresetId={editingPresetId}
          onStartEdit={startEditPreset}
          onCancelEdit={cancelEditPreset}
          onSaveEdit={saveEditedPreset}
          /* --- nouveau : bouton reset (icône à gauche du champ) --- */
          onResetAll={resetAll}
        />
      </div>

      {/* Branche principale */}
      <div className="w-full">
        <PathScroller
          paths={RUNE_PATHS}
          selectedKey={selectedPath}
          onPick={pickPath}
          ariaSuffix="principale"
        />
      </div>

      {/* Arborescence principale */}
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
                    <TierGrid
                      key={tier.id}
                      tier={tier}
                      isActive={(id) => selectedByTier[tier.id] === id}
                      onPick={(id) => pickPrimaryOption(tier.id, id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Branche secondaire */}
      {selectedPath && (
        <div className="w-full mt-8">
          <PathScroller
            paths={RUNE_PATHS}
            selectedKey={selectedSecondaryPath}
            onPick={pickSecondaryPath}
            ariaSuffix="secondaire"
            disabledKey={selectedPath}
          />
        </div>
      )}

      {/* Arborescence secondaire */}
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
              <div className="rounded-xl p-3 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
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
                      <TierGrid
                        key={tier.id}
                        tier={tier}
                        isActive={(id) =>
                          selectedSecondaryByTier[
                            tier.id as "slot1" | "slot2" | "slot3"
                          ] === id
                        }
                        getDisabled={(id) => {
                          const active =
                            selectedSecondaryByTier[
                              tier.id as "slot1" | "slot2" | "slot3"
                            ] === id;
                          const alreadyPicked = Boolean(
                            selectedSecondaryByTier[
                              tier.id as "slot1" | "slot2" | "slot3"
                            ]
                          );
                          const count = Object.values(
                            selectedSecondaryByTier
                          ).filter(Boolean).length;
                          return !active && (alreadyPicked || count >= 2);
                        }}
                        onPick={(id) =>
                          pickSecondaryRune(
                            tier.id as "slot1" | "slot2" | "slot3",
                            id
                          )
                        }
                      />
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shards */}
      <div className="mt-8">
        <div className="mx-auto w-11/12 max-w-xl">
          <div className="rounded-xl p-3 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
            <h3 className="text-base font-semibold mb-2 text-center">
              Shards (statistiques complémentaires)
            </h3>
            <div className="flex flex-col gap-4">
              {SHARD_TIERS.map((tier) => (
                <TierGrid
                  key={tier.id}
                  tier={tier as any} // RuneTier-compatible (même shape)
                  isActive={(id) => selectedShards[tier.id] === id}
                  onPick={(id) => pickShardOption(tier.id, id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Résumé */}
      <div className="mt-6">
        <div className="mx-auto w-11/12 max-w-xl">
          <SummaryPanel summary={summary} onReset={resetAll} />
        </div>
      </div>
    </section>
  );
}
