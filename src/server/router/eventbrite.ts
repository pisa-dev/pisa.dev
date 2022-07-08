import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const eventbriteRouter = createRouter().query("info", {
  input: z.object({
    id: z.string(),
  }),
  async resolve({ input }) {
    const url = `https://www.eventbriteapi.com/v3/events/${input.id}/capacity_tier/`;
    const capacityRes = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`,
      },
    });
    if (capacityRes.status !== 200) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `fetching EventBrite api: ${capacityRes.statusText}`,
      });
    }
    const capacityData = await capacityRes.json();
    return {
      capacity: {
        pending: capacityData.capacity_pending,
        sold: capacityData.capacity_sold,
        total: capacityData.capacity_total,
      },
    };
  },
});
