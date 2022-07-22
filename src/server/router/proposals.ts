import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const proposalsRouter = createRouter()
  .query("listMine", {
    async resolve({ ctx }) {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.eventProposal.findMany({
        where: {
          creatorEmail: ctx.session.user.email,
        },
      });
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.eventProposal.findFirst({
        where: {
          id: input.id,
          creatorEmail: ctx.session.user.email,
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
        duration: z.string(),
      }),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (!input.id) {
        return await ctx.prisma.eventProposal.create({
          data: {
            ...input.data,
            creatorEmail: ctx.session.user.email,
          },
        });
      } else {
        return await ctx.prisma.eventProposal.update({
          data: input.data,
          where: {
            id: input.id,
          },
        });
      }
    },
  });
