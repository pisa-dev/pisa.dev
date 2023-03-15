// src/pages/_app.tsx
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import "@fontsource/inter/variable.css";
import "@/styles/globals.css";
import Head from "next/head";
import PlausibleProvider from "next-plausible";
import { Session } from "next-auth";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <PlausibleProvider
        selfHosted
        customDomain="https://plausible.anto.pt"
        domain="pisa.dev"
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </PlausibleProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
