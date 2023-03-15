import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { registerUser } from "@/server/listmonk";

export const newsletterRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      await registerUser(input.email);
    }),
});
