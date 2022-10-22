import fetch from "node-fetch";

export async function registerUser(email: string) {
  // List of ids to subscribe new users to.
  const includeListIds = [
    2, // newsletter
  ];

  const url = "https://mailinglist.pisa.dev/api/subscribers";

  const username = process.env.LISTMONK_USERNAME;
  const password = process.env.LISTMONK_PASSWORD;

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
}
