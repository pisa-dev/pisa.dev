import { useScript } from "usehooks-ts";
import { trackGoatCounterEvent } from "~/utils/goatcounter";

export const PrivacyPolicyLink = () => {
  useScript("https://cdn.iubenda.com/iubenda.js");

  const onClick = () => {
    trackGoatCounterEvent("privacy-policy-link-click");
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
