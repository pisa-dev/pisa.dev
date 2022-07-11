import { createRouter } from "./context";
import { z } from "zod";

export const surveyRouter = createRouter()
  .query("get-survey", {
    input: z.object({
      eventId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.eventSurvey.findFirst({
        where: {
          eventId: input.eventId,
        },
        include: {
          EventSurveyQuestion: {
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
        return await ctx.prisma.eventSurveyAnswers.create({
          data: input.data,
        });
      } else {
        return await ctx.prisma.eventSurveyAnswers.update({
          data: input.data,
          where: {
            id: input.id,
          },
        });
      }
    },
  });
