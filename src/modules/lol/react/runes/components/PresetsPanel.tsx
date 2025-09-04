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
  // édition
  editingPresetId,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  // 🔁 reset UI/page
  onResetAll,
}: {
  presetName: string;
  setPresetName: (v: string) => void;
  presets: RuneBuild[];
  onSave: () => void;
  onLoad: (p: RuneBuild) => void;
  onDelete: (id: string) => void;

  editingPresetId: string | null;
  onStartEdit: (p: RuneBuild) => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;

  /** Réinitialiser l'interface (désélectionner toutes les runes) */
  onResetAll: () => void;
}) {
  const isEditing = Boolean(editingPresetId);

  return (
    <div className="rounded-xl p-3 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
      <h3 className="text-base font-semibold mb-2 text-center">Presets</h3>

      <div className="flex gap-2 items-center">
        {/* 🔁 Bouton icône Reset à gauche du champ texte */}
        <button
  type="button"
  onClick={onResetAll}
  aria-label="Réinitialiser la page de runes"
  title="Réinitialiser la page de runes"
  className="shrink-0 p-2 rounded-full cursor-pointer
             transition-shadow transition-transform duration-300 ease-out
             hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.5
             ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700"
>
          {/* Icône refresh (SVG inline, pas de lib externe) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M3.172 7a7 7 0 111.414 6.414l-.707.707A8.5 8.5 0 102 6.5V9h1.5V5H0v1.5h2.172z" />
          </svg>
        </button>

        <input
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          placeholder={
            isEditing ? "Renommer le preset..." : "Nom de la page de rune (ex: Ezreal - poke)"
          }
          className="flex-1 rounded-md px-3 py-2 text-sm ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 bg-transparent"
          aria-label={isEditing ? "Nom du preset (édition)" : "Nom du preset"}
        />

        {isEditing ? (
          <>
            <button
              type="button"
              onClick={onSaveEdit}
              disabled={!presetName.trim()}
              className="rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-emerald-300 dark:ring-emerald-700 hover:shadow-sm disabled:opacity-50"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 hover:shadow-sm"
            >
              Annuler
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onSave}
            disabled={!presetName.trim()}
            className="rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 hover:shadow-sm disabled:opacity-50 transition-shadow transition-transform duration-300 ease-out
             hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
          >
            Enregistrer
          </button>
        )}
      </div>

      {presets.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {presets
  .slice()
  .sort((a, b) => b.createdAt - a.createdAt)
  .map((p) => (
    <li
      key={p.id}
      className="flex items-center justify-between gap-2 rounded-lg ring-1 ring-inset ring-neutral-200 dark:ring-neutral-700 p-2"
    >
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
                    className="rounded-md px-2 py-1 text-xs ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 transition-shadow transition-transform duration-300 ease-out
             hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                  >
                    Charger
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartEdit(p)}
                    className="rounded-md px-2 py-1 text-xs ring-1 ring-inset ring-amber-300 dark:ring-amber-700 text-amber-700 dark:text-amber-400 transition-shadow transition-transform duration-300 ease-out
             hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(p.id)}
                    className="rounded-md px-2 py-1 text-xs ring-1 ring-inset ring-red-300 dark:ring-red-700 text-red-600 dark:text-red-400 transition-shadow transition-transform duration-300 ease-out
             hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                  >
                    Supprimer
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
