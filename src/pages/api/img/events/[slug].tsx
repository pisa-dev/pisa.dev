import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { env } from "~/env.mjs";

interface EventTable {
  id: string;
  slug: string;
  title: string;
}

interface Database {
  Event: EventTable;
}

const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: env.PSCALE_HOST,
    username: env.PSCALE_USERNAME,
    password: env.PSCALE_PASSWORD,
  }),
});

export const config = {
  runtime: "edge",
};

const getSlug = (req: NextApiRequest) => {
  // usually req.params.slug should work, not sure why it doesn't in this route. Maybe a next.js bug?
  if (!req.url) {
    console.error("No URL in request");
    return undefined;
  }
  const url = new URL(req.url, `http://${req.headers.host}`);
  const slug = url.searchParams.get("slug");
  return slug;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = getSlug(req);
  if (!slug) {
    return new Response("No slug", { status: 400 });
  }

  const event = await db
    .selectFrom("Event")
    .select(["title"])
    .where("slug", "=", slug)
    .executeTakeFirst();
  if (!event) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <span>{event.title}</span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};

export default handler;
