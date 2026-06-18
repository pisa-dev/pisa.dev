"use client";

import { useParams } from "next/navigation";
import { SurveyPageContent } from "@/components/Survey/SurveyPageContent";

const SurveyPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  if (!slug || typeof slug !== "string") {
    return <div>No survey slug</div>;
  }

  return <SurveyPageContent id={slug} />;
};

export default SurveyPage;
