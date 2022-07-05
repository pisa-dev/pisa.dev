import { NextPage } from "next";
import Head from "next/head";
import CentralContent from "../components/centralContent";
import Footer from "../components/footer";
import Header from "../components/header";

const content = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper purus lorem, eu lacinia est tincidunt nec. Donec ac nunc sapien. Suspendisse potenti. Quisque dolor lacus, ultrices ac quam at, ornare vulputate dolor. Mauris tempus interdum justo, quis sodales tellus fermentum vitae. Cras interdum fringilla eleifend. Aliquam venenatis rhoncus accumsan. Proin venenatis elit et facilisis interdum. Curabitur vitae volutpat ipsum. Maecenas a bibendum magna. Phasellus eros purus, ullamcorper non neque vel, convallis posuere ligula. Suspendisse potenti. Nulla viverra ornare molestie. Proin ut ligula vitae nisi molestie scelerisque in finibus massa. Suspendisse et tempus neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Nunc gravida at risus sed dictum. Morbi eget ex tincidunt, volutpat magna et, egestas orci. Fusce sed nunc et metus ultrices egestas ac ac turpis. Curabitur nec mauris ligula. Aenean eget diam et mauris aliquet tempus vitae sit amet arcu. Suspendisse felis massa, ultrices ac risus sed, egestas semper lorem. Mauris blandit sollicitudin nibh ut tincidunt. Ut tincidunt velit a velit hendrerit porttitor. Proin quis elementum quam.",
  "Donec aliquam velit vel lacinia laoreet. Nam sit amet ultricies ipsum. Aliquam facilisis condimentum ultrices. Donec fermentum viverra lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse ac efficitur justo. Vestibulum eu velit quis orci dictum pharetra. Pellentesque a dignissim lorem. Donec ligula ante, aliquam non fringilla ac, ultricies a turpis. Duis porttitor ac sem gravida iaculis. Suspendisse commodo sit amet ante nec molestie. Phasellus in aliquam est, vel tincidunt mi.",
  "Sed ac sapien vel est finibus commodo. Curabitur nibh eros, dapibus vestibulum lobortis id, ornare id risus. Praesent dignissim dui lobortis suscipit blandit. Duis consectetur mi et posuere viverra. Nam rhoncus, nibh sed tincidunt dictum, erat magna vestibulum augue, at pretium nulla turpis a nunc. Phasellus sodales bibendum vulputate. Nunc nulla eros, consequat id hendrerit eu, bibendum quis enim.",
  "Suspendisse aliquam, erat sed sagittis faucibus, massa leo pulvinar arcu, id pretium sapien nisi ut quam. Aenean commodo mauris in nibh maximus fermentum. Duis cursus congue semper. Praesent mollis tortor a mattis hendrerit. Donec pharetra molestie erat vitae aliquam. Phasellus eu est metus. Quisque luctus luctus dignissim. Nunc vulputate quam nisi, et gravida nulla consequat quis.",
];

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>pisa.dev - Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <CentralContent
          title="Privacy policy"
          paragraphs={content}
          className="mb-6"
        />
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
