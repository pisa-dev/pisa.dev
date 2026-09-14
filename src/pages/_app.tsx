// src/pages/_app.tsx
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "@fontsource/inter/variable.css";
import "@/styles/globals.css";
import Head from "next/head";
import { Session } from "next-auth";
import { trackGoatCounterPageView } from "~/utils/goatcounter";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackGoatCounterPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Script
        data-goatcounter="https://stats.pisa.dev/count"
        data-goatcounter-settings='{"no_onload":true}'
        src="//stats.pisa.dev/count.js"
        strategy="afterInteractive"
        onLoad={() =>
          trackGoatCounterPageView(
            window.location.pathname + window.location.search
          )
        }
      />
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
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
