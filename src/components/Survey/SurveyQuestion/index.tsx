import { EventSurveyQuestionKind } from "@prisma/client";
import { FC } from "react";
import { SurveyQuestionSingleChoice } from "./SurveyQuestionSingleChoice";
import { SurveyQuestionStars } from "./SurveyQuestionStars";
import { SurveyQuestionTextbox } from "./SurveyQuestionTextbox";

export interface SurveyQuestionProps {
  q: string;
  details?: string | null;
  required?: boolean;
  data: any;
  onSubmit: (stars: string) => void;
  onBack?: () => void;
}

export const questionElementByKind = (
  k: EventSurveyQuestionKind
): FC<SurveyQuestionProps> | null => {
  switch (k) {
    case "stars":
      return SurveyQuestionStars;
    case "singlechoice":
      return SurveyQuestionSingleChoice;
    case "textbox":
      return SurveyQuestionTextbox;
    default:
      return null;
  }
};

export * from "./SurveyQuestionStars";
