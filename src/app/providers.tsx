"use client";

import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import type { ReactNode } from "react";

import { TRPCProvider } from "@/components/TRPCProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <PlausibleProvider
      selfHosted
      customDomain="https://plausible.anto.pt"
      domain="pisa.dev"
    >
      <SessionProvider>
        <TRPCProvider>{children}</TRPCProvider>
      </SessionProvider>
    </PlausibleProvider>
  );
};
