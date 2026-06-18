import "@fontsource-variable/inter";
import "@/styles/globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "pisa.dev",
  description: "la community degli sviluppatori pisani",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="it">
      <body className="dark:bg-slate-900 dark:text-slate-300">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
