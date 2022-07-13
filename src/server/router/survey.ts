import { createRouter } from "./context";
import { z } from "zod";

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
