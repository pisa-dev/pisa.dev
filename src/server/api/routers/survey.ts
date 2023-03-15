import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const surveyRouter = createTRPCRouter({
  getSurvey: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
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
    }),

  getSurveyResults: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.survey.findFirst({
        where: {
          id: input.id,
        },
        include: {
          questions: {
            include: {
              answers: {
                where: {
                  answer: {
                    not: "",
                  },
                },
              },
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    }),

  getQuestionById: adminProcedure
    .input(
      z.object({
        questionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.surveyQuestion.findFirst({
        where: {
          id: input.questionId,
        },
        include: {
          answers: {
            where: {
              answer: {
                not: "",
              },
            },
          },
        },
      });
    }),

  getAnswersByCorrelationId: adminProcedure
    .input(
      z.object({
        surveyId: z.string(),
        correlationId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.surveyAnswer.findMany({
        where: {
          correlationId: input.correlationId,
          question: {
            surveyId: input.surveyId,
          },
        },
        include: {
          question: true,
        },
      });
    }),

  addAnswer: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        data: z.object({
          questionId: z.string(),
          answer: z.string(),
          correlationId: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        return await ctx.prisma.surveyAnswer.create({
          data: input.data,
        });
      } else {
        try {
          return await ctx.prisma.surveyAnswer.update({
            data: {
              answer: input.data.answer,
            },
            where: {
              id: input.id,
            },
          });
        } catch (err) {
          // row might not exist anymore, create a new one
          return await ctx.prisma.surveyAnswer.create({
            data: input.data,
          });
        }
      }
    }),
});
