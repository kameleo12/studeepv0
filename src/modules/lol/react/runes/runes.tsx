"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** ---------- Types ---------- */
type RuneOption = { id: string; name: string; description?: string };
type RuneTierId = "keystone" | "slot1" | "slot2" | "slot3";
type RuneTier = { id: RuneTierId; label: string; options: RuneOption[] };
type RunePathKey =
  | "precision"
  | "domination"
  | "sorcery"
  | "resolve"
  | "inspiration";
type RunePath = {
  key: RunePathKey;
  name: string;
  tagline: string;
  tiers: RuneTier[];
};
type ShardTierId = "attack" | "flex" | "defense";
type ShardTier = { id: ShardTierId; label: string; options: RuneOption[] };

/** ---------- Données ---------- */
const RUNE_PATHS: RunePath[] = [
  {
    key: "precision",
    name: "PRÉCISION",
    tagline: "Dégâts soutenus",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          {
            id: "pressTheAttack",
            name: "Press the Attack",
            description: "3 AA → dégâts + vulnérabilité",
          },
          {
            id: "lethalTempo",
            name: "Lethal Tempo",
            description: "Vitesse d’attaque accrue après trade",
          },
          {
            id: "fleetFootwork",
            name: "Fleet Footwork",
            description: "Soin + MS après charge",
          },
          {
            id: "conqueror",
            name: "Conqueror",
            description: "Stacking AD/AP + sustain",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "absorbLife",
            name: "Absorb Life",
            description: "Soin sur kill de sbires/monstres",
          },
          {
            id: "triumph",
            name: "Triumph",
            description: "Soin + or sur takedown",
          },
          {
            id: "presenceOfMind",
            name: "Presence of Mind",
            description: "Mana/énergie sustain",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "legendAlacrity",
            name: "Legend: Alacrity",
            description: "Vitesse d’attaque",
          },
          {
            id: "legendHaste",
            name: "Legend: Haste",
            description: "Hâte de compétence",
          },
          {
            id: "legendBloodline",
            name: "Legend: Bloodline",
            description: "Vol de vie",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "coupDeGrace",
            name: "Coup de Grâce",
            description: "Dégâts cibles low HP",
          },
          {
            id: "cutDown",
            name: "Cut Down",
            description: "Dégâts cibles tanky",
          },
          {
            id: "lastStand",
            name: "Last Stand",
            description: "+dégâts low HP",
          },
        ],
      },
    ],
  },
  {
    key: "domination",
    name: "DOMINATION",
    tagline: "Burst & chasse",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          {
            id: "electrocute",
            name: "Electrocute",
            description: "Burst sur 3 hits",
          },
          {
            id: "darkHarvest",
            name: "Dark Harvest",
            description: "Stacking dégâts + âme",
          },
          {
            id: "hailOfBlades",
            name: "Hail of Blades",
            description: "Vitesse d’attaque éclair",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "cheapShot",
            name: "Cheap Shot",
            description: "Dégâts vrais sur CC",
          },
          {
            id: "tasteOfBlood",
            name: "Taste of Blood",
            description: "Soin poke",
          },
          {
            id: "suddenImpact",
            name: "Sudden Impact",
            description: "Dégâts vrais après dash/fufu",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "deepWard",
            name: "Deep Ward",
            description: "Wards ennemies durent plus",
          },
          {
            id: "sixthSense",
            name: "Sixth Sense",
            description: "Timers auto + détection ward",
          },
          {
            id: "grislyMementos",
            name: "Grisly Mementos",
            description: "Stacks → trinket haste",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "treasureHunter",
            name: "Treasure Hunter",
            description: "Or bonus par takedown",
          },
          {
            id: "relentlessHunter",
            name: "Relentless Hunter",
            description: "MS hors combat",
          },
          {
            id: "ultimateHunter",
            name: "Ultimate Hunter",
            description: "Hâte ultime",
          },
        ],
      },
    ],
  },
  {
    key: "sorcery",
    name: "SORCELLERIE",
    tagline: "Poke & utilité",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          { id: "aery", name: "Summon Aery", description: "Dégâts/bouclier" },
          {
            id: "arcaneComet",
            name: "Arcane Comet",
            description: "Comète magique",
          },
          {
            id: "phaseRush",
            name: "Phase Rush",
            description: "MS + anti slow",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "axiomAcanist",
            name: "Axiom Acanist",
            description: "Renforce l’ultime + refund CD",
          },
          {
            id: "manaflowBand",
            name: "Manaflow Band",
            description: "Mana max + régén",
          },
          {
            id: "nimbusCloak",
            name: "Nimbus Cloak",
            description: "MS après sort invocateur",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "transcendence",
            name: "Transcendence",
            description: "Hâte progressive",
          },
          {
            id: "celerity",
            name: "Celerity",
            description: "MS + convertie en stats",
          },
          {
            id: "absoluteFocus",
            name: "Absolute Focus",
            description: "AD/AP > 70% PV",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          { id: "scorch", name: "Scorch", description: "Brûlure poke" },
          {
            id: "waterwalking",
            name: "Waterwalking",
            description: "MS + stats rivière",
          },
          {
            id: "gatheringStorm",
            name: "Gathering Storm",
            description: "Scaling AD/AP",
          },
        ],
      },
    ],
  },
  {
    key: "resolve",
    name: "VOLONTÉ",
    tagline: "Tank & survie",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          {
            id: "grasp",
            name: "Grasp of the Undying",
            description: "AA → dégâts + soin + PV max",
          },
          {
            id: "aftershock",
            name: "Aftershock",
            description: "Résistances après CC",
          },
          { id: "guardian", name: "Guardian", description: "Bouclier allié" },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          { id: "demolish", name: "Demolish", description: "Charge tourelle" },
          {
            id: "fontOfLife",
            name: "Font of Life",
            description: "Soins aux alliés sur CC",
          },
          {
            id: "shieldBash",
            name: "Shield Bash",
            description: "AA boosté après shield",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "conditioning",
            name: "Conditioning",
            description: "+armure/MR mid game",
          },
          {
            id: "secondWind",
            name: "Second Wind",
            description: "Régén après poke",
          },
          {
            id: "bonePlating",
            name: "Bone Plating",
            description: "Réduit prochains dégâts",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "overgrowth",
            name: "Overgrowth",
            description: "PV max sur morts",
          },
          {
            id: "revitalize",
            name: "Revitalize",
            description: "Boost soins/boucliers",
          },
          {
            id: "unflinching",
            name: "Unflinching",
            description: "Ténacité/anti slow",
          },
        ],
      },
    ],
  },
  {
    key: "inspiration",
    name: "INSPIRATION",
    tagline: "Créativité & utilité",
    tiers: [
      {
        id: "keystone",
        label: "Keystones",
        options: [
          {
            id: "glacialAugment",
            name: "Glacial Augment",
            description: "Rayons de ralentissement",
          },
          {
            id: "unsealedSpellbook",
            name: "Unsealed Spellbook",
            description: "Switch sorts invocateurs",
          },
          {
            id: "firstStrike",
            name: "First Strike",
            description: "Dégâts + or si tu engages",
          },
        ],
      },
      {
        id: "slot1",
        label: "Slot 1",
        options: [
          {
            id: "hextechFlash",
            name: "Hextech Flashtaption",
            description: "Hexflash",
          },
          {
            id: "magicalFootwear",
            name: "Magical Footwear",
            description: "Bottes gratuites + MS",
          },
          {
            id: "perfectTiming",
            name: "Perfect Timing",
            description: "Chronomètre",
          },
        ],
      },
      {
        id: "slot2",
        label: "Slot 2",
        options: [
          {
            id: "tripleTonic",
            name: "Triple Tonic",
            description: "3 élixirs (niv. 3/6/9)",
          },
          {
            id: "timeWarpTonic",
            name: "Time Warp Tonic",
            description: "Consos + rapides + MS",
          },
          {
            id: "biscuitDelivery",
            name: "Biscuit Delivery",
            description: "Biscuits soin/mana",
          },
        ],
      },
      {
        id: "slot3",
        label: "Slot 3",
        options: [
          {
            id: "cosmicInsight",
            name: "Cosmic Insight",
            description: "Hâte items + invocateurs",
          },
          {
            id: "approachVelocity",
            name: "Approach Velocity",
            description: "MS vers cibles ralenties",
          },
          {
            id: "jackOfAllTrades",
            name: "Jack of All Trades",
            description: "Stacking AF sur diversité objets",
          },
        ],
      },
    ],
  },
];

const SHARD_TIERS: ShardTier[] = [
  {
    id: "attack",
    label: "Rang 1 – Attaque",
    options: [
      { id: "af9", name: "+9 AF", description: "≈ +5,4 AD / +9 AP" },
      { id: "as10", name: "+10% Vitesse d’attaque" },
      { id: "ah8", name: "+8 Hâte de compétence" },
    ],
  },
  {
    id: "flex",
    label: "Rang 2 – Flex",
    options: [
      { id: "af9_flex", name: "+9 AF" },
      { id: "ms2", name: "+2% Vitesse de déplacement" },
      { id: "hp10_180", name: "+10–180 PV", description: "Scaling niveau" },
    ],
  },
  {
    id: "defense",
    label: "Rang 3 – Défense",
    options: [
      { id: "hp65", name: "+65 PV" },
      {
        id: "tenacity10",
        name: "+10% Ténacité & résistance aux ralentissements",
      },
      { id: "hp10_180_def", name: "+10–180 PV", description: "Scaling niveau" },
    ],
  },
];

/** ---------- UI Helpers ---------- */
function Card({
  active,
  disabled,
  children,
  onClick,
  ariaLabel,
}: {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={[
        // ↓ cartes compactes
        "w-full rounded-xl p-3 text-left shadow-sm ring-1 ring-inset transition focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm",
        "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 ring-neutral-300 hover:shadow-md",
        "dark:bg-neutral-900/80 dark:supports-[backdrop-filter]:bg-neutral-900/60 dark:ring-neutral-700",
        active ? "ring-2 ring-blue-500" : "",
        disabled ? "opacity-50 pointer-events-none" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/** ---------- Page ---------- */
export default function RunesPage() {
  // Primaire
  const [selectedPath, setSelectedPath] = useState<RunePathKey | null>(null);
  const [selectedByTier, setSelectedByTier] = useState<
    Record<RuneTierId, string | null>
  >({
    keystone: null,
    slot1: null,
    slot2: null,
    slot3: null,
  });

  // Secondaire
  const [selectedSecondaryPath, setSelectedSecondaryPath] =
    useState<RunePathKey | null>(null);
  const [selectedSecondaryByTier, setSelectedSecondaryByTier] = useState<
    Record<Exclude<RuneTierId, "keystone">, string | null>
  >({ slot1: null, slot2: null, slot3: null });

  // Shards
  const [selectedShards, setSelectedShards] = useState<
    Record<ShardTierId, string | null>
  >({
    attack: null,
    flex: null,
    defense: null,
  });

  const currentPath = useMemo(
    () => RUNE_PATHS.find((p) => p.key === selectedPath) ?? null,
    [selectedPath]
  );
  const currentSecondaryPath = useMemo(
    () => RUNE_PATHS.find((p) => p.key === selectedSecondaryPath) ?? null,
    [selectedSecondaryPath]
  );

  /** ---- Resets ---- */
  const resetRunesPrimary = () =>
    setSelectedByTier({
      keystone: null,
      slot1: null,
      slot2: null,
      slot3: null,
    });
  const resetRunesSecondary = () =>
    setSelectedSecondaryByTier({ slot1: null, slot2: null, slot3: null });
  const resetShards = () =>
    setSelectedShards({ attack: null, flex: null, defense: null });

  // 🔹 Bouton unique : réinitialise TOUTE la page
  const resetAll = () => {
    setSelectedPath(null);
    setSelectedSecondaryPath(null);
    setSelectedByTier({
      keystone: null,
      slot1: null,
      slot2: null,
      slot3: null,
    });
    setSelectedSecondaryByTier({ slot1: null, slot2: null, slot3: null });
    setSelectedShards({ attack: null, flex: null, defense: null });
  };

  /** ---- Handlers ---- */
  const handlePickPath = (key: RunePathKey) => {
    setSelectedPath(key);
    resetRunesPrimary();
    if (selectedSecondaryPath === key) {
      setSelectedSecondaryPath(null);
      resetRunesSecondary();
    }
  };
  const handlePickSecondaryPath = (key: RunePathKey) => {
    if (key === selectedPath) return;
    setSelectedSecondaryPath(key);
    resetRunesSecondary();
  };
  const handlePickOption = (tier: RuneTierId, optionId: string) =>
    setSelectedByTier((prev) => ({
      ...prev,
      [tier]: prev[tier] === optionId ? null : optionId,
    }));
  const handlePickSecondaryOption = (
    tier: Exclude<RuneTierId, "keystone">,
    optionId: string
  ) =>
    setSelectedSecondaryByTier((prev) => {
      if (prev[tier] === optionId) return { ...prev, [tier]: null };
      const count = Object.values(prev).filter(Boolean).length;
      if (count >= 2) return prev;
      return { ...prev, [tier]: optionId };
    });
  const handlePickShard = (tier: ShardTierId, optionId: string) =>
    setSelectedShards((prev) => ({
      ...prev,
      [tier]: prev[tier] === optionId ? null : optionId,
    }));

  /** ---- Derived ---- */
  const secondaryCount = useMemo(
    () => Object.values(selectedSecondaryByTier).filter(Boolean).length,
    [selectedSecondaryByTier]
  );

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

      {/* ====== 1) BRANCHE PRINCIPALE (ligne unique) ====== */}
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
                  <div className="text-center">
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

      {/* ====== 2) ARBORESCENCE PRINCIPALE (colonne centrée compacte) ====== */}
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
              <div className="rounded-xl p-3 ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
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

                      {/* === options en 3 colonnes === */}
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
                              <div className="flex items-center justify-between gap-3">
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
                                <div
                                  className={[
                                    "h-4 w-4 rounded-full ring-1 ring-inset",
                                    active
                                      ? "bg-blue-500 ring-blue-500"
                                      : "bg-transparent ring-neutral-300 dark:ring-neutral-700",
                                  ].join(" ")}
                                  aria-hidden
                                />
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

      {/* ====== 3) BRANCHE SECONDAIRE (ligne unique) ====== */}
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
                    <div className="text-center">
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

      {/* ====== 4) ARBORESCENCE SECONDAIRE (2 runes max, 3 colonnes) ====== */}
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
              <div className="rounded-xl p-3 ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
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

                        {/* === options en 3 colonnes === */}
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
                                <div className="flex items-center justify-between gap-3">
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
                                  <div
                                    className={[
                                      "h-4 w-4 rounded-full ring-1 ring-inset",
                                      active
                                        ? "bg-blue-500 ring-blue-500"
                                        : "bg-transparent ring-neutral-300 dark:ring-neutral-700",
                                    ].join(" ")}
                                    aria-hidden
                                  />
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

      {/* ====== 5) SHARDS (3 colonnes, compact) ====== */}
      <div className="mt-8">
        <div className="mx-auto w-11/12 max-w-xl">
          <div className="rounded-xl p-3 ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
            <h3 className="text-base font-semibold mb-2 text-center">
              Shards (statistiques complémentaires)
            </h3>

            <div className="flex flex-col gap-4">
              {SHARD_TIERS.map((tier) => (
                <div key={tier.id} className="flex flex-col">
                  <div className="text-xs font-semibold mb-2 text-center">
                    {tier.label}
                  </div>

                  {/* === options en 3 colonnes === */}
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
                          <div className="flex items-center justify-between gap-3">
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
                            <div
                              className={[
                                "h-4 w-4 rounded-full ring-1 ring-inset",
                                active
                                  ? "bg-blue-500 ring-blue-500"
                                  : "bg-transparent ring-neutral-300 dark:ring-neutral-700",
                              ].join(" ")}
                              aria-hidden
                            />
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

      {/* ====== 6) RÉSUMÉ (compact) ====== */}
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
                      <span className="font-medium">{s.tier} :</span> {s.option}
                    </li>
                  ))}
                </ul>

                {/* 🔹 Bouton unique pour tout réinitialiser */}
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="rounded-lg px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 hover:shadow-sm transition"
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
    </section>
  );
}
