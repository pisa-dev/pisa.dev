import { TRPCError } from "@trpc/server";

const newEBRequester = (apiKey: string) => async ({ url, method = 'GET' }: { url: string, method?: string }) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (res.status !== 200) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `fetching EventBrite api: ${res.statusText}`,
    });
  }

  return res.json();
};

interface TicketClassesResult {
  ticket_classes: {
    display_name: string;
    quantity_total: number;
    quantity_sold: number;
  }[];
}
interface BaseEventBrite {
  ticketClasses(eventId: string): Promise<TicketClassesResult>;
}

const EB_BASE_URL = 'https://www.eventbriteapi.com/v3';
export const newEBClient = (apiKey: string): BaseEventBrite => ({
  ticketClasses: (eventId) => newEBRequester(apiKey)({ url: `${EB_BASE_URL}/events/${eventId}/ticket_classes/` }),
});


type PaginatedResponse<T extends Object> = {
  object_count: number;
  continuation: string;
  page_count: number;
  page_size: number;
  has_more_items: boolean;
  page_number: number; // starts at 1
} & T;
type PaginatedRequest = {
  continuation?: string;
};

type BaseReportData<T> = {
  timezone: string;
  event_ids: string[];
  data: {
    date: string;
    topics: string;
    date_localized: string;
    totals: T;
  }[];
};
export type SalesReportResult = BaseReportData<{
  currency: string;
  gross: number;
  net: number;
  quantity: number;
  fees: number;
  royalty: number;
}>;
export type AttendeeReportResult = BaseReportData<{
  num_attendees: number;
  num_orders: number;
}>;
interface Event {
  // Note: this is a subset of the real `Event` object coming from EB
  name: string;
  summary?: string;
  url: string;
  start: string;
  end: string;
  status: 'draft' | 'live' | 'started' | 'ended' | 'completed' | 'canceled';
}
type EventTypeFilter = 'all' | 'live';
interface OrganizationEventBrite {
  eventsList: (r: PaginatedRequest) => Promise<PaginatedResponse<{ events: Event[] }>>;
  reports: {
    sales: (f?: EventTypeFilter) => Promise<SalesReportResult>;
    attendee: (f?: EventTypeFilter) => Promise<AttendeeReportResult>;
  }
}

export const newEBOrgClient = (apiKey: string, orgId: string): OrganizationEventBrite => {
  const orgUrl = `${EB_BASE_URL}/organizations/${orgId}`;
  const requester = newEBRequester(apiKey);
  return {
    reports: {
      sales: (f = 'all') => requester({ url: `${orgUrl}/reports/sales/?event_status=${f}` }),
      attendee: (f = 'all') => requester({ url: `${orgUrl}/reports/attendees/?event_status=${f}` }),
    },
    eventsList: ({ continuation }) => requester({ url: `${orgUrl}/events/?continuation=${continuation}` }),
  };
};
