// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { TRPCError } from "@trpc/server";

import { exampleRouter } from "./example";
import { newsletterRouter } from "./newsletter";
import { eventbriteRouter } from "./eventbrite";
import { proposalsRouter } from "./proposals";
import { surveyRouter } from "./survey";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("newsletter.", newsletterRouter)
  .merge(
    "admin.",
    createRouter()
      .middleware(async ({ ctx, next }) => {
        if (!ctx.session?.user.admin) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next();
      })
      .merge("eventbrite.", eventbriteRouter)
  )
  .merge("proposals.", proposalsRouter)
  .merge("survey.", surveyRouter)
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
