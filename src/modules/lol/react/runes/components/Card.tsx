// modules/lol/react/runes/components/Card.tsx
"use client";

export default function Card({
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
        // Base layout
        "w-full rounded-xl p-3 text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm ",

        // Transitions (couleurs + transform) + GPU
        "transform-gpu transition-colors transition-transform duration-200 ease-out ",



        // Désactivé
        disabled ? "opacity-50 pointer-events-none" : "",

        // États visuels : actif = fond noir + texte blanc + scale
        active
          ? "bg-black text-white ring-neutral-900"
          : [
              "bg-white/80 text-neutral-900 ring-neutral-300",
              "dark:bg-neutral-900/80 dark:text-white dark:ring-neutral-700",
              "backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60",
            ].join(" "),
      ].join(" ")}
    >
      {/* toutes les images enfants → rondes, sans bordure, taille fixe */}
      <div className="w-full h-full [&_img]:rounded-full [&_img]:border-0 [&_img]:h-10 [&_img]:w-10 [&_img]:object-cover ">
        {children}
      </div>
    </button>
  );
}
