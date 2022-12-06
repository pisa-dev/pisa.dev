import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SpeakerInfo } from "@/components/SpeakerInfo";
import { trpc } from "@/utils/trpc";
import Head from "next/head";

const SpeakersPage = () => {
  const q = trpc.useQuery(["speaker.get-all"]);

  if (!q.data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Lista degli speaker - pisa.dev</title>
      </Head>
      <Header />
      <main>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-prose text-lg">
            {q.data.map((s) => {
              return <SpeakerInfo speaker={s} key={s.id}></SpeakerInfo>;
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SpeakersPage;
