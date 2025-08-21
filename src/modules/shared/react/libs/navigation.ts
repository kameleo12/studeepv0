// @root/modules/shared/react/libs/navigation.ts
"use client";

import NextLink from "next/link";
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from "next/navigation";

/**
 * Remplace le Link de next-intl par le Link natif de Next.js
 */
export const Link = NextLink;

/**
 * Redirection immédiate
 */
export function redirect(path: string) {
  if (typeof window !== "undefined") {
    window.location.href = path;
  } else {
    // En SSR, tu peux utiliser la fonction redirect de "next/navigation"
    const { redirect: serverRedirect } = require("next/navigation");
    return serverRedirect(path);
  }
}

/**
 * Renvoie le pathname courant
 */
export const usePathname = useNextPathname;

/**
 * Renvoie le router natif
 */
export const useRouter = useNextRouter;
