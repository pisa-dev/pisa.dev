import { createRouter } from "./context";
import { z } from "zod";
import { JobOffer, RemoteKind } from "@prisma/client";
import fetch from "node-fetch";

export const jobsRouter = createRouter().mutation("insert", {
  input: z.object({
    data: z.object({
      title: z.string(),
      description: z.string(),
      salaryRange: z.string(),
      companyName: z.string(),
      offerURL: z.string(),
      remote: z.nativeEnum(RemoteKind),
    }),
  }),
  async resolve({ ctx, input }) {
    const offer = await ctx.prisma.jobOffer.create({
      data: input.data,
    });

    const telegramMsg = await sendTelegramMessage(offer);

    const offerWithTelegram = await ctx.prisma.jobOffer.update({
      data: {
        telegramMessageID: telegramMsg.message_id,
        telegramMessageChatID: telegramMsg.chat.username,
      },
      where: { id: offer.id },
    });

    return offerWithTelegram;
  },
});

const sendTelegramMessage = async (offer: JobOffer) => {
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_JOBS_CHAT_ID,
        text: renderText(offer),
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

const renderText = (o: JobOffer): string => {
  return `**${o.title}**, ${o.companyName}
**RAL**: ${o.salaryRange}

${o.description}`;
};
