import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

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

  const event = await prisma
    .event
    .findUnique({
      select: {
        id: true,
        title: true,
        date: true,
        location: true,
      },
      where: {
        slug,
      }
    });
  if (!event) {
    return new Response("Not found", { status: 404 });
  }

  const speakers = await prisma
    .speaker
    .findMany({
      where: {
        events: {
          some: {
            id: event.id
          }
        }
      }
    });

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "InterRegular",
        }}
        tw="h-full w-full flex flex-row bg-white"
      >
        <div tw="h-full w-2/3 grow flex flex-col justify-between p-16">
          <div tw="flex h-14 w-full">
            <img
              style={{
                objectFit: "contain",
              }}
              tw="h-full"
              src="https://data.pisa.dev/public/logo.svg"
            />
          </div>

          <div
            tw="flex flex-col"
            style={{
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: `${Math.min((72 * 37) / event.title.length, 72)}px`,
                fontFamily: "InterBlack",
                lineHeight: 1,
              }}
            >
              {event.title}
            </span>

            <div tw="flex flex-col text-xl">
              <span>
                {event.date.toLocaleString(new Intl.Locale("it"), {
                  day: "numeric",
                  month: "long",
                  hour: "numeric",
                  minute: "numeric",
                })}{" "}
                presso {event.location}
              </span>
            </div>
          </div>

          {speakers.length === 1 ? (
            <div
              tw="flex flex-col"
              style={{
                gap: "1rem",
              }}
            >
              {speakers.map((speaker) => (
                <div
                  key={speaker.name}
                  tw="flex flex-row items-center"
                  style={{
                    gap: "2rem",
                  }}
                >
                  <div tw="flex overflow-hidden rounded-full h-24 w-24">
                    <img
                      style={{ objectFit: "cover" }}
                      tw=" h-full w-full"
                      src={speaker.imageUrl}
                    />
                  </div>

                  <div
                    tw="flex flex-col"
                    style={{
                      gap: "0.5rem",
                    }}
                  >
                    <span tw="text-[40px] leading-[40px]">{speaker.name}</span>
                    <span tw="text-[24px]">{speaker.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : speakers.length > 1 ? (
            <div
              tw="flex flex-col"
              style={{
                gap: "1rem",
              }}
            >
              <div
                tw="flex flex-row"
                style={{
                  gap: "2rem",
                }}
              >
                {speakers.map((speaker) => (
                  <div
                    key={speaker.name}
                    tw="flex overflow-hidden rounded-full h-22 w-22"
                  >
                    <img
                      style={{ objectFit: "cover" }}
                      tw=" h-full w-full"
                      src={speaker.imageUrl}
                    />
                  </div>
                ))}
              </div>

              <span tw="text-[24px]">
                {speakers
                  .slice(0, -1)
                  .map((s) => s.name)
                  .join(",")}{" "}
                e {speakers.at(-1)?.name}
              </span>
            </div>
          ) : (
            <div />
          )}
        </div>

        <div tw="flex h-full w-1/3">
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: await loadFonts(),
    }
  );
};

const loadFonts = async () => {
  return [
    {
      name: "InterBlack",
      data: await fetch(
        new URL(`../../../../assets/Inter-Black.ttf`, import.meta.url)
      ).then((res) => res.arrayBuffer()),
    },
    {
      name: "InterRegular",
      data: await fetch(
        new URL(`../../../../assets/Inter-Regular.ttf`, import.meta.url)
      ).then((res) => res.arrayBuffer()),
    },
  ];
};

export default handler;
