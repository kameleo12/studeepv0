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
        "w-full rounded-xl p-3 text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm",
        "transition-colors duration-200 hover:shadow-md",
        disabled ? "opacity-50 pointer-events-none" : "",
        active
          ? // 👉 quand actif : fond noir + texte blanc
            "bg-black text-white ring-neutral-900"
          : // 👉 sinon : fond clair (light et dark mode)
            "bg-white/80 text-neutral-900 ring-neutral-300 " +
            "dark:bg-neutral-900/80 dark:text-white dark:ring-neutral-700 " +
            "backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
