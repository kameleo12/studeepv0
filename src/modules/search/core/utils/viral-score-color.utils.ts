export const ViralScoreColors = {
  red: "red",
  orange: "orange",
  green: "green",
  gold: "gold",
} as const;

export type ViralScoreColor = keyof typeof ViralScoreColors;

export const getViralScoreColorCategory = (
  viralScore: number
): ViralScoreColor => {
  if (viralScore < 60) return ViralScoreColors.red;
  if (viralScore < 80) return ViralScoreColors.orange;
  if (viralScore < 100) return ViralScoreColors.green;
  return ViralScoreColors.gold;
};

export const getViralScoreStyles = (color: ViralScoreColor): string => {
  const styles: Record<ViralScoreColor, string> = {
    [ViralScoreColors.red]: `
      bg-red-600 
      text-red-50 
      hover:scale-[1.02] 
      transition-transform 
      duration-300 
      shadow-md 
      border border-red-400/30
    `,
    [ViralScoreColors.orange]: `
      bg-orange-600 
      text-orange-50 
      hover:scale-[1.02]
      transition-transform 
      duration-300 
      shadow-md
      border border-orange-400/30
      bg-gradient-to-br 
      from-orange-500 
      to-orange-700 
      hover:bg-gradient-to-br 
      hover:from-orange-600 
      hover:to-orange-800
    `,
    [ViralScoreColors.green]: `
      bg-green-700 
      text-green-50 
      animate-soft-pulse 
      shadow-lg 
      border border-green-400/30
      bg-gradient-to-br 
      from-green-600 
      to-green-800 
      hover:from-green-700 
      hover:to-green-900
    `,
    [ViralScoreColors.gold]: `
      bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
      from-amber-500 
      via-yellow-600 
      to-amber-800
      animate-golden-pulse
      border-2 
      border-amber-300/50
      shadow-xl
      font-extrabold
      text-lg
      text-stone-950
      relative
      overflow-hidden
      [text-shadow:_0_1px_2px_rgba(252,211,77,0.4)]
      before:absolute 
      before:inset-0
      before:bg-[conic-gradient(from_90deg_at_50%_50%,#FEE140_0%,#FA709A_50%,#FEE140_100%)]
      before:opacity-30
      before:animate-rotating-overlay
      after:absolute 
      after:inset-0
      after:bg-[radial-gradient(60%_50%_at_50%_50%,#fff_0%,rgba(255,255,255,0)_100%)]
      after:opacity-30
      after:animate-soft-glow
    `,
  };

  return styles[color];
};
