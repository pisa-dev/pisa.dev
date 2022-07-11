import useScript from "@/hooks/useScript";
import { usePlausible } from "next-plausible";

export const PrivacyPolicyLink = () => {
  const plausible = usePlausible();
  useScript("https://cdn.iubenda.com/iubenda.js");

  const onClick = () => {
    plausible("privacy-policy-link-click");
  };

  return (
    <a
      href="https://www.iubenda.com/privacy-policy/86268195"
      className="iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe "
      title="Privacy Policy "
      onClick={onClick}
    >
      Privacy Policy
    </a>
  );
};
