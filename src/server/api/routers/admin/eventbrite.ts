import { adminProcedure, createTRPCRouter } from "../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";
import { AttendeeReportResult, newEBClient, newEBOrgClient } from "~/utils/event_brite_client";

function validateRequiredInfo(s: string | undefined): asserts s is string {
  if (!s) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `missing EventBrite api required info`,
    });
  };
};

export const eventbriteRouter = createTRPCRouter({
  info: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      validateRequiredInfo(env.EVENTBRITE_TOKEN);
      return {
        ticketClasses: await newEBClient(env.EVENTBRITE_TOKEN)
          .ticketClasses(input.id)
      };
    }),
  lastEventsOrders: adminProcedure.
    query(async () => {
    validateRequiredInfo(env.EVENTBRITE_TOKEN);
    validateRequiredInfo(env.EVENTBRITE_ORG_ID);
    

    }),
});
