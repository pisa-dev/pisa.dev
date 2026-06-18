import HomePageClient from "./page-client";

type HomePageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  const showEmailVerifiedBanner =
    typeof searchParams?.email_verified !== "undefined";

  return <HomePageClient showEmailVerifiedBanner={showEmailVerifiedBanner} />;
}
