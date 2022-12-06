// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { TRPCError } from "@trpc/server";

import { exampleRouter } from "./example";
import { newsletterRouter } from "./newsletter";
import { eventbriteRouter } from "./eventbrite";
import { eventsRouter } from "./events";
import { proposalsRouter } from "./proposals";
import { surveyRouter } from "./survey";
import { jobsRouter } from "./jobs";
import { adminEventsRouter } from "./admin_events";
import { speakerRouter } from "./speaker";

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
      .merge("events.", adminEventsRouter)
  )
  .merge("events.", eventsRouter)
  .merge("proposals.", proposalsRouter)
  .merge("survey.", surveyRouter)
  .merge("speaker.", speakerRouter)
  .merge("jobs.", jobsRouter)
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
