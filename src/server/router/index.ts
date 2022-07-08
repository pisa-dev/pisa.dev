// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { newsletterRouter } from "./newsletter";
import { eventbriteRouter } from "./eventbrite";
import { getServerSession } from "../auth";
import { TRPCError } from "@trpc/server";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("newsletter.", newsletterRouter)
  .merge(
    "admin.",
    createRouter()
      .middleware(async ({ ctx, next }) => {
        const session = await getServerSession(ctx);
        if (!session?.user.admin) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next();
      })
      .merge("eventbrite.", eventbriteRouter)
  )
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
