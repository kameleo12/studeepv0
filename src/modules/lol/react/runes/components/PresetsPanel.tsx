// modules/lol/react/runes/components/PresetsPanel.tsx
"use client";

import { RuneBuild } from "@root/modules/lol/core/model/runes.model";

export function PresetsPanel({
  presetName,
  setPresetName,
  presets,
  onSave,
  onLoad,
  onDelete,
}: {
  presetName: string;
  setPresetName: (v: string) => void;
  presets: RuneBuild[];
  onSave: () => void;
  onLoad: (p: RuneBuild) => void;
  onDelete: (id: string) => void;
}) {
  return (
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
          onClick={onSave}
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
              <li key={p.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {p.primaryPath ?? "—"} · {p.secondaryPath ?? "—"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onLoad(p)}
                    className="rounded-md px-2 py-1 text-xs ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700"
                  >
                    Charger
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(p.id)}
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
  );
}
