import { createRouter } from "./context";
import { z } from "zod";
import { getSession } from "next-auth/react";
import { TRPCError } from "@trpc/server";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      const session = await getSession({ req: ctx.req });
      if (!session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.prisma.example.findMany();
    },
  })
  .mutation("newsletterSubscribe", {
    input: z.object({
      email: z.string().email(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.newsletterSubscription.create({
        data: {
          email: input.email,
          verified: false,
        },
      });
    },
  });
