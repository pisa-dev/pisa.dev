import { createRouter } from "./context";
import { getServerSession } from "../auth";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const eventsRouter = createRouter()
  .query("listMine", {
    async resolve({ ctx }) {
      const session = await getServerSession(ctx);
      if (!session || !session.user || !session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.event.findMany({
        where: {
          creatorEmail: session.user.email,
        },
      });
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const session = await getServerSession(ctx);
      if (!session || !session.user || !session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.event.findFirst({
        where: {
          id: input.id,
          creatorEmail: session.user.email,
        },
      });
    },
  })
  .mutation("upsert", {
    input: z.object({
      id: z.string().optional(),
      data: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    async resolve({ ctx, input }) {
      const session = await getServerSession(ctx);
      if (!session?.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const res = await ctx.prisma.event.upsert({
        create: {
          ...input.data,
          creatorEmail: session.user.email,
        },
        update: input.data,
        where: {
          id: input.id,
        },
      });

      return res;
    },
  });
