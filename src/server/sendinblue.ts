import fetch from "node-fetch";

export async function registerUser(email: string) {
  // Id of the SendInBlue template to be used for the confirmation email.
  const templateId = 1;

  // List of ids to subscribe new users to.
  const includeListIds = [
    2, // newsletter
  ];

  // Url to redirect to after the user has confirmed their email.
  const redirectionUrl = "https://pisa.dev/?email_verified=true";

  const url = "https://api.sendinblue.com/v3/contacts/doubleOptinConfirmation";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "api-key": process.env.SENDINBLUE_API_KEY || "missing-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ templateId, includeListIds, redirectionUrl, email }),
  });

  if (res.status !== 200 && res.status !== 201) {
    const txt = await res.text();
    throw new Error(`sendinblue error (status code ${res.status}): ${txt}`);
  }
}
