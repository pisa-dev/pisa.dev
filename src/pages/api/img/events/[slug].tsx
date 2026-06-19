import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";
import { getEventBySlug } from "@/lib/events";

const getSlug = (req: NextApiRequest) => {
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

  const event = await getEventBySlug(slug);
  if (!event) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    <div
      style={{
        fontFamily: "InterRegular",
        background: "#000",
        color: "#fff",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 60px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          marginBottom: "20px",
          lineHeight: 1.2,
        }}
      >
        {event.title}
      </div>
      <div style={{ fontSize: "32px", color: "#aaa", marginBottom: "10px" }}>
        {event.date.toLocaleDateString("it-IT", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div style={{ fontSize: "28px", color: "#888" }}>{event.location}</div>
      {event.speakers.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            fontSize: "24px",
            color: "#ccc",
          }}
        >
          con {event.speakers.map((s) => s.name).join(", ")}
        </div>
      )}
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
};

export default handler;
