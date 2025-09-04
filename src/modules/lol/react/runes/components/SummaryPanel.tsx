// modules/lol/react/runes/components/SummaryPanel.tsx
"use client";

export function SummaryPanel({
  summary,
  onReset,
}: {
  summary: {
    path: string;
    secondaryPath: string;
    picksPrimary: { tier: string; option: string }[];
    picksSecondary: { tier: string; option: string }[];
    shards: { tier: string; option: string }[];
  } | null;
  onReset: () => void;
}) {
  return (
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
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={onReset}
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
  );
}
