import { createRouter } from "./context";
import { z } from "zod";
import { JobOffer, JobOfferTags, RemoteKind } from "@prisma/client";
import fetch from "node-fetch";

export type JobOfferWithTags = JobOffer & {
  tags: JobOfferTags[];
};

export const jobsRouter = createRouter()
  .query("get-page", {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.date().nullish()
    }),
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 20;
      const { cursor } = input;

      const items = await ctx.prisma.jobOffer.findMany({
        include: {
          tags: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit + 1,
        cursor: cursor ? { createdAt: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.createdAt;
      }
      return {
        items,
        nextCursor,
      };

    }
  })
  .mutation("insert", {
    input: z.object({
      data: z.object({
        title: z.string(),
        description: z.string(),
        location: z.string().optional(),
        salaryRange: z.string(),
        companyName: z.string(),
        offerURL: z.string(),
        remote: z.nativeEnum(RemoteKind),
      }),
      tags: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      const tags = input.tags
        .map((t) => t.trim())
        .filter((t) => t && t.length > 0);

      // create new tags
      await ctx.prisma.jobOfferTags.createMany({
        data: tags.map((t) => ({
          tag: normalizeTag(t),
          tagPretty: normalizeTagPretty(t),
        })),
        skipDuplicates: true,
      });

      // fetch from db tags (both old and just created)
      const normalizedTags = tags.map((t) => normalizeTag(t));
      const dbTags = await ctx.prisma.jobOfferTags.findMany({
        select: { id: true },
        where: {
          tag: { in: normalizedTags },
        },
      });

      const offer = await ctx.prisma.jobOffer.create({
        data: {
          ...input.data,
          tags: {
            connect: dbTags,
          },
        },
        include: { tags: true },
      });

      const telegramMsg = await sendTelegramMessage(offer);

      const offerWithTelegram = await ctx.prisma.jobOffer.update({
        data: {
          telegramMessageID: telegramMsg.message_id,
          telegramMessageChatID: telegramMsg.chat.username,
        },
        where: { id: offer.id },
        include: {
          tags: true,
        },
      });

      return offerWithTelegram;
    },
  });

const sendTelegramMessage = async (offer: JobOfferWithTags) => {
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_JOBS_CHAT_ID,
        text: renderText(offer).slice(0, 4096),
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Info e candidature",
                url: `https://pisa.dev/api/jobs/${offer.id}`,
              },
            ],
          ],
        },
      }),
    }
  );
  if (res.status != 200) {
    const text = await res.text();
    throw new Error(
      `Telegram error: status code = ${res.status}, message = ${text}`
    );
  }

  const data = (await res.json()) as TelegramResult<TelegramMessage>;
  return data.result;
};

interface TelegramResult<T> {
  ok: boolean;
  result: T;
}

interface TelegramMessage {
  message_id: number;
  chat: { id: number; username: string };
}

const renderText = (o: JobOfferWithTags): string => {
  return [
    `📣 ${o.title}, ${o.companyName}`,
    `💰 RAL: ${o.salaryRange}`,
    `🌎 Remoto: ${renderRemoteEnum(o.remote)}`,
    o.location ? `📍 Location: ${o.location}` : undefined,
    o.tags.length > 0 ? renderJobOfferTags(o.tags) : undefined,
    ``,
    `${o.description}`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");
};

const renderRemoteEnum = (r: RemoteKind): string =>
({
  [RemoteKind.full]: "Sì, full time",
  [RemoteKind.partial]: "Parziale / ibrido",
  [RemoteKind.no]: "No",
}[r]);

const renderJobOfferTags = (tags: JobOfferTags[]): string =>
  tags.map((t) => telegramEscapeTag(t.tagPretty)).join(" ");


const telegramEscapeTag = (tag: string): string => {
  tag = tag.trim()

  const checkSharp = /(c|f)#/gi
  for (let i = tag.search(checkSharp); i !== -1; i = tag.search(checkSharp))
    tag = tag.slice(0, i + 1) + 'Sharp' + tag.slice(i + 2)

  tag = tag.replaceAll(/[\/\ @#]/g, '_')

  return '#' + (tag[0] == '_' ? tag.slice(1) : tag)
}

const normalizeTag = (t: string): string => {
  t = t.trim().toLowerCase()
  while (t[0] === '#') t = t.slice(1)
  return t.trim()
};

const normalizeTagPretty = (t: string): string => t.trim();
