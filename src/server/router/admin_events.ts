import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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

      await ctx.prisma.event.update({
        where: { id: input.id },
        data: input.data,
      });

      if (ctx.next) {
       // ISR revalidation
        await ctx.next.res.revalidate(`/event/${e.slug}`);
        await ctx.next.res.revalidate(`/`);
      }

      // return await ctx.prisma.event.update({
      // 	where: {
      // 		id: input.id,
      // 	},
      // 	data: { },
      // });
    },
  })
  .mutation("create", {
    input: z.object({ data: AdminEventPayload }),
    async resolve({ ctx, input }) {
      const e = await ctx.prisma.event.create({
        data: input.data,
      });

      if (ctx.next) {
       // ISR revalidation
        await ctx.next.res.revalidate(`/event/${e.slug}`);
        await ctx.next.res.revalidate(`/`);
      }

      return e;
    },
  });
