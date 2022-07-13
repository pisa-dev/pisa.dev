import { NextPage } from "next";
import { useRouter } from "next/router";
import { SurveyPageContent } from "@/components/Survey/SurveyPageContent";

const SurveyPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  if (!slug || typeof slug !== "string") {
    return <div>No survey slug</div>;
  }

  return <SurveyPageContent id={slug} />;
};

export default SurveyPage;
