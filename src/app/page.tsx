import HomePageClient from "./page-client";

type HomePageProps = {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const showEmailVerifiedBanner =
    typeof resolvedSearchParams?.email_verified !== "undefined";

  return <HomePageClient showEmailVerifiedBanner={showEmailVerifiedBanner} />;
}
