import { z } from "zod";
import { createRouter } from "./context";

export const speakerRouter = createRouter()
  .query("get-by-slug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.speaker.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          events: true,
        },
      });
    },
  })
  .query("get-all", {
    async resolve({ ctx }) {
      return await ctx.prisma.speaker.findMany({
        include: {
          events: true,
        },
        orderBy: {
          slug: "asc",
        }
      });
    },
  });