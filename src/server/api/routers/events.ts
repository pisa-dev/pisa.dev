import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { Event, Speaker } from "@prisma/client";

export type EventWithSpeaker = Event & { speakers: Speaker[] };

export const eventsRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.event.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          speakers: true,
        },
      });
    }),
  getAll: publicProcedure
    .input(
      z
        .object({
          unlisted: z.boolean(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const upcoming: EventWithSpeaker[] = await ctx.prisma.event.findMany({
        include: {
          speakers: true,
        },
        where: {
          ...(input !== undefined ? { unlisted: input.unlisted } : {}),
          date: {
            gte: new Date(),
          },
        },
        orderBy: {
          date: "asc",
        },
      });

      const past: EventWithSpeaker[] = await ctx.prisma.event.findMany({
        include: {
          speakers: true,
        },
        where: {
          ...(input !== undefined ? { unlisted: input.unlisted } : {}),
          date: {
            lte: new Date(),
          },
        },
        orderBy: {
          date: "desc",
        },
      });

      return {
        upcoming,
        past,
      };
    }),
});
