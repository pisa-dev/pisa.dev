import fetch from "node-fetch";
import { env } from "~/env.mjs";

export async function registerUser(email: string) {
  // List of ids to subscribe new users to.
  const includeListIds = [
    2, // newsletter
  ];

  const url = "https://mailinglist.pisa.dev/api/subscribers";

  const username = env.LISTMONK_USERNAME;
  const password = env.LISTMONK_PASSWORD;

  if (!username || !password) {
    throw new Error("missing listmonk credentials");
  }

  const authorization =
    "Basic " + Buffer.from(username + ":" + password).toString("base64");

  const res = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify({
      email,
      name: email,
      status: "enabled",
      lists: includeListIds,
    }),
  });

  if (res.status !== 200 && res.status !== 201) {
    const txt = await res.text();
    throw new Error(`listmonk error (status code ${res.status}): ${txt}`);
  }

  const subscriber = await res.json();

  const optInRes = await fetch(`https://mailinglist.pisa.dev/api/subscribers/${subscriber.data.id}/optin`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify({
      email,
      name: email,
      status: "enabled",
      lists: includeListIds,
    }),
  });

  if (optInRes.status !== 200 && optInRes.status !== 201) {
    const txt = await optInRes.text();
    throw new Error(`listmonk optin error (status code ${res.status}): ${txt}`);
  }
}
