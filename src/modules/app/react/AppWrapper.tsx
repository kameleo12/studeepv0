// modules/app/react/AppWrapper.tsx
"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { app } from "@root/modules/app/main";

type Props = { children: ReactNode };

export function AppWrapper({ children }: Props) {
  // Appel côté client : fournit le store Redux à toute l'app.
  return <Provider store={app.store}>{children}</Provider>;
}

export default AppWrapper;
