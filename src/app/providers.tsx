"use client";

import PlausibleProvider from "next-plausible";
import type { ReactNode } from "react";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <PlausibleProvider
      selfHosted
      customDomain="https://plausible.anto.pt"
      domain="pisa.dev"
    >
      {children}
    </PlausibleProvider>
  );
};
