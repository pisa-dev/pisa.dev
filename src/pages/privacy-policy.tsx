import { NextPage } from "next";
import Head from "next/head";
import CentralContent from "../components/centralContent";
import Footer from "../components/footer";
import Header from "../components/header";

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>pisa.dev - Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <CentralContent title="Privacy policy" className="mb-6">
          <div className="space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              semper purus lorem, eu lacinia est tincidunt nec. Donec ac nunc
              sapien. Suspendisse potenti. Quisque dolor lacus, ultrices ac quam
              at, ornare vulputate dolor. Mauris tempus interdum justo, quis
              sodales tellus fermentum vitae. Cras interdum fringilla eleifend.
              Aliquam venenatis rhoncus accumsan. Proin venenatis elit et
              facilisis interdum. Curabitur vitae volutpat ipsum. Maecenas a
              bibendum magna. Phasellus eros purus, ullamcorper non neque vel,
              convallis posuere ligula. Suspendisse potenti. Nulla viverra
              ornare molestie. Proin ut ligula vitae nisi molestie scelerisque
              in finibus massa. Suspendisse et tempus neque. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              semper purus lorem, eu lacinia est tincidunt nec. Donec ac nunc
              sapien. Suspendisse potenti. Quisque dolor lacus, ultrices ac quam
              at, ornare vulputate dolor. Mauris tempus interdum justo, quis
              sodales tellus fermentum vitae. Cras interdum fringilla eleifend.
              Aliquam venenatis rhoncus accumsan. Proin venenatis elit et
              facilisis interdum. Curabitur vitae volutpat ipsum. Maecenas a
              bibendum magna. Phasellus eros purus, ullamcorper non neque vel,
              convallis posuere ligula. Suspendisse potenti. Nulla viverra
              ornare molestie. Proin ut ligula vitae nisi molestie scelerisque
              in finibus massa. Suspendisse et tempus neque. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              semper purus lorem, eu lacinia est tincidunt nec. Donec ac nunc
              sapien. Suspendisse potenti. Quisque dolor lacus, ultrices ac quam
              at, ornare vulputate dolor. Mauris tempus interdum justo, quis
              sodales tellus fermentum vitae. Cras interdum fringilla eleifend.
              Aliquam venenatis rhoncus accumsan. Proin venenatis elit et
              facilisis interdum. Curabitur vitae volutpat ipsum. Maecenas a
              bibendum magna. Phasellus eros purus, ullamcorper non neque vel,
              convallis posuere ligula. Suspendisse potenti. Nulla viverra
              ornare molestie. Proin ut ligula vitae nisi molestie scelerisque
              in finibus massa. Suspendisse et tempus neque. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </CentralContent>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
