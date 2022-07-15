import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useSurveyCorrelationId = () => {
  const [correlationId, setCorrelationId] = useLocalStorage(
    "correlation-id",
    ""
  );
  useEffect(() => {
    if (!correlationId) {
      setCorrelationId(crypto.randomUUID());
    }
  }, [correlationId, setCorrelationId]);
  return correlationId;
};
