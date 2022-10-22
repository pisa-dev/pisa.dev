import { createRouter } from "./context";
import { z } from "zod";
import { registerUser } from "@/server/listmonk";

export const newsletterRouter = createRouter().mutation("subscribe", {
  input: z.object({
    email: z.string().email(),
  }),
  async resolve({ input }) {
    await registerUser(input.email);
  },
});
