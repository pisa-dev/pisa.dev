import { createRouter } from "./context";
import { z } from "zod";
import { getServerSession } from "../auth";
import { TRPCError } from "@trpc/server";

export const surveyRouter = createRouter()
  .query("get-survey", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.survey.findFirst({
        where: {
          id: input.id,
        },
        include: {
          questions: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    },
  })
  .query("get-survey-results", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      // check permission
      const session = await getServerSession(ctx);
      if (!session?.user.admin) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.survey.findFirst({
        where: {
          id: input.id,
        },
        include: {
          questions: {
            include: {
              answers: true,
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    },
  })
  .mutation("add-answer", {
    input: z.object({
      id: z.string().optional(),
      data: z.object({
        questionId: z.string(),
        answer: z.string(),
      }),
    }),
    async resolve({ ctx, input }) {
      if (!input.id) {
        return await ctx.prisma.surveyAnswer.create({
          data: input.data,
        });
      } else {
        return await ctx.prisma.surveyAnswer.update({
          data: input.data,
          where: {
            id: input.id,
          },
        });
      }
    },
  });
