import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const proposalsRouter = createTRPCRouter({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.eventProposal.findMany({
      where: {
        creatorEmail: ctx.session.user.email,
      },
    });
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.eventProposal.findFirst({
        where: {
          id: input.id,
          creatorEmail: ctx.session.user.email,
        },
      });
    }),

  upsert: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        data: z.object({
          title: z.string(),
          description: z.string(),
          duration: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
    }),
});
