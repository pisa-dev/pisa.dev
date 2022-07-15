import { SurveyQuestionKind } from "@prisma/client";
import { FC } from "react";
import { SurveyQuestionSingleChoice } from "./SurveyQuestionSingleChoice";
import { SurveyQuestionStars } from "./SurveyQuestionStars";
import { SurveyQuestionTextbox } from "./SurveyQuestionTextbox";
import { SurveyQuestionMultipleChoices } from "./SurveyQuestionMultipleChoices";

export interface SurveyQuestionProps {
  q: string;
  details?: string | null;
  required?: boolean;
  data: any;
  loading?: boolean;
  onSubmit: (stars: string) => void;
  onBack?: () => void;
}

export const questionElementByKind = (
  k: SurveyQuestionKind
): FC<SurveyQuestionProps> | null => {
  switch (k) {
    case "stars":
      return SurveyQuestionStars;
    case "singlechoice":
      return SurveyQuestionSingleChoice;
    case "textbox":
      return SurveyQuestionTextbox;
    case "multiplechoices":
      return SurveyQuestionMultipleChoices;
    default:
      return null;
  }
};

export * from "./SurveyQuestionStars";
