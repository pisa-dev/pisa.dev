import { newsletterRouter } from "~/server/api/routers/newsletter";
import { eventbriteRouter } from "~/server/api/routers/eventbrite";
import { eventsRouter } from "~/server/api/routers/events";
import { proposalsRouter } from "~/server/api/routers/proposals";
import { surveyRouter } from "~/server/api/routers/survey";
import { jobsRouter } from "~/server/api/routers/jobs";
import { adminEventsRouter } from "~/server/api/routers/admin_events";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  newsletter: newsletterRouter,
  events: eventsRouter,
  proposals: proposalsRouter,
  survey: surveyRouter,
  jobs: jobsRouter,
  admin: createTRPCRouter({
    eventbrite: eventbriteRouter,
    events: adminEventsRouter,
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
