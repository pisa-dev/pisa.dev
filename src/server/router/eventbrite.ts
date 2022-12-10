import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

interface TicketClassesResult {
  ticket_classes: {
    display_name: string;
    quantity_total: number;
    quantity_sold: number;
  }[];
}

export const eventbriteRouter = createRouter().query("info", {
  input: z.object({
    id: z.string(),
  }),
  async resolve({ input }) {
    const url = `https://www.eventbriteapi.com/v3/events/${input.id}/ticket_classes/`;
    const apiRes = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`,
      },
    });
    if (apiRes.status !== 200) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `fetching EventBrite api: ${apiRes.statusText}`,
      });
    }
    const data = (await apiRes.json()) as TicketClassesResult;
    return {
      ticketClasses: data,
    };
  },
});
