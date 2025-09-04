// modules/lol/react/runes/hooks/useRunesState.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  RuneBuild,
  RunePathKey,
  RuneTierId,
  ShardTierId,
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

import {
  makeRuneBuild,
  applyRuneBuild,
} from "@root/modules/lol/core/usecase/rune-presets.usecase";
import { runePresetsGateway } from "@root/modules/lol/gateways-impl/localstorage/rune-preset.local";

export function useRunesState() {
  // ---- UI state
  const [selectedPath, setSelectedPath] = useState<RunePathKey | null>(null);
  const [selectedByTier, setSelectedByTier] = useState<
    Record<RuneTierId, string | null>
  >(initialSelectedByTier());

  const [selectedSecondaryPath, setSelectedSecondaryPath] =
    useState<RunePathKey | null>(null);
  const [selectedSecondaryByTier, setSelectedSecondaryByTier] = useState<
    Record<Exclude<RuneTierId, "keystone">, string | null>
  >(initialSelectedSecondaryByTier());

  const [selectedShards, setSelectedShards] = useState<
    Record<ShardTierId, string | null>
  >(initialSelectedShards());

  // ---- Presets
  const [presetName, setPresetName] = useState("");
  const [presets, setPresets] = useState<RuneBuild[]>([]);

  useEffect(() => {
    setPresets(runePresetsGateway.list());
  }, []);

  const refreshPresets = () => setPresets(runePresetsGateway.list());

  const savePreset = () => {
    if (!presetName.trim()) return;
    const build = makeRuneBuild({
      name: presetName.trim(),
      primaryPath: selectedPath,
      selectedByTier,
      secondaryPath: selectedSecondaryPath,
      selectedSecondaryByTier,
      selectedShards,
    });
    runePresetsGateway.save(build);
    setPresetName("");
    refreshPresets();
  };

  const loadPreset = (p: RuneBuild) => {
    const next = applyRuneBuild(p);
    setSelectedPath(next.path);
    setSelectedSecondaryPath(next.secondaryPath);
    setSelectedByTier(next.selectedByTier);
    setSelectedSecondaryByTier(next.selectedSecondaryByTier);
    setSelectedShards(next.selectedShards);
  };

  const deletePreset = (id: string) => {
    runePresetsGateway.remove(id);
    refreshPresets();
  };

  // ---- Derived
  const currentPath = useMemo(
    () => RUNE_PATHS.find((p) => p.key === selectedPath) ?? null,
    [selectedPath]
  );
  const currentSecondaryPath = useMemo(
    () => RUNE_PATHS.find((p) => p.key === selectedSecondaryPath) ?? null,
    [selectedSecondaryPath]
  );

  // ---- Handlers domaine
  const pickPath = (key: RunePathKey) => {
    setSelectedPath(key);
    setSelectedByTier(initialSelectedByTier());
    if (selectedSecondaryPath === key) {
      setSelectedSecondaryPath(null);
      setSelectedSecondaryByTier(initialSelectedSecondaryByTier());
    }
  };

  const pickSecondaryPath = (key: RunePathKey) => {
    if (key === selectedPath) return;
    setSelectedSecondaryPath(key);
    setSelectedSecondaryByTier(initialSelectedSecondaryByTier());
  };

  const pickPrimaryOption = (tier: RuneTierId, optionId: string) =>
    setSelectedByTier((prev) => pickOption(prev, tier, optionId));

  const pickSecondaryRune = (
    tier: Exclude<RuneTierId, "keystone">,
    optionId: string
  ) =>
    setSelectedSecondaryByTier((prev) =>
      pickSecondaryOption(prev, tier, optionId)
    );

  const pickShardOption = (tier: ShardTierId, optionId: string) =>
    setSelectedShards((prev) => pickShard(prev, tier, optionId));

  const resetAll = () => {
    const init = resetAllRunes();
    setSelectedPath(init.path);
    setSelectedSecondaryPath(init.secondaryPath);
    setSelectedByTier(init.selectedByTier);
    setSelectedSecondaryByTier(init.selectedSecondaryByTier);
    setSelectedShards(init.selectedShards);
  };

  // ---- Summary
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

  return {
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

    // derived
    summary,
  };
}
