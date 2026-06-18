import "@fontsource-variable/inter";
import "@/styles/globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "pisa.dev",
  description: "la community degli sviluppatori pisani",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
  },
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
