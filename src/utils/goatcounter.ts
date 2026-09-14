export interface GoatCounterEvent {
  path: string;
  title?: string;
  event?: boolean;
  no_session?: boolean;
}

export interface GoatCounter {
  count: (event: GoatCounterEvent) => void;
}

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

export const trackGoatCounterPageView = (path: string) => {
  window.goatcounter?.count({ path });
};

export const trackGoatCounterEvent = (path: string) => {
  window.goatcounter?.count({ path, event: true, no_session: true });
};
