import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { s3Upload } from "../s3";
import { randomUUID } from "crypto";

const imageUpload = async (img: string, key = randomUUID()) => {
  try {
    const blob = Buffer.from(img, 'base64url');

    return await s3Upload(key, blob)
  } catch (e) {
    throw e;
  }
}

const AdminEventPayload = z.object({
  slug: z.string(),
  title: z.string(),
  location: z.string(),
  date: z.date(),
  eventbriteId: z.string(),
  abstract: z.string(),
  description: z.string(),
  imageUrl: z.string().nullable(),
  unlisted: z.boolean(),
});

export const adminEventsRouter = createRouter()
  .mutation("update", {
    input: z.object({
      id: z.string(),
      data: AdminEventPayload.partial(),
    }),
    async resolve({ ctx, input }) {
      const e = await ctx.prisma.event.findFirst({ where: { id: input.id } });
      if (!e) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const { imageUrl: rawImageUrl, ...request } = input.data;
      const imageUrl = rawImageUrl && await imageUpload(rawImageUrl);

      await ctx.prisma.event.update({
        where: { id: input.id },
        data: {
          ...request,
          imageUrl,
        },
      });

      if (ctx.next) {
       // ISR revalidation
        await ctx.next.res.revalidate(`/event/${e.slug}`);
        await ctx.next.res.revalidate(`/`);
      }
    },
  })
  .mutation("create", {
    input: z.object({ data: AdminEventPayload }),
    async resolve({ ctx, input }) {
      const { imageUrl: rawImageUrl, ...request } = input.data;
      const imageUrl = rawImageUrl && await imageUpload(rawImageUrl);
      const e = await ctx.prisma.event.create({
        data: {
          ...request,
          imageUrl,
        }
      });

      if (ctx.next) {
       // ISR revalidation
        await ctx.next.res.revalidate(`/event/${e.slug}`);
        await ctx.next.res.revalidate(`/`);
      }

      return e;
    },
  });
