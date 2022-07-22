import { createRouter } from "./context";
import { z } from "zod";

export const eventsRouter = createRouter().query("get-by-slug", {
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
});
