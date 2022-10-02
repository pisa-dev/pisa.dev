import { createRouter } from "./context";
import { z } from "zod";
import { Event, Speaker } from "@prisma/client";

export type EventWithSpeaker = Event & { speakers: Speaker[] };

export const eventsRouter = createRouter()
  .query("get-by-slug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.event.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          speakers: true,
        },
      });
    },
  })
  .query("get-all", {
    input: z.object({
      unlisted: z.boolean(),
    }).optional(),
    async resolve({ ctx, input }) {
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
    },
  });
