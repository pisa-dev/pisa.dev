import { FC, useEffect } from "react";
import { usePlausible } from "next-plausible";
import useScript from "../../hooks/useScript";

export interface EventbriteCheckoutProps {
  eventId: string;
}

interface EBWidgets {
  createWidget: (options: {
    widgetType: "checkout";
    eventId: string;
    modal: true;
    modalTriggerElementId: string;
    onOrderComplete: () => void;
  }) => void;
}

declare global {
  interface Window {
    EBWidgets: EBWidgets;
  }
}

export const EventbriteCheckout: FC<EventbriteCheckoutProps> = ({
  eventId,
}) => {
  const plausible = usePlausible();

  const status = useScript(
    "https://www.eventbrite.it/static/widgets/eb_widgets.js"
  );

  useEffect(() => {
    const onOrderComplete = () => {
      plausible("eventbrite-checkout-success", { props: { eventId } });
    };

    if (!eventId || status !== "ready") {
      return;
    }

    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      modal: true,
      modalTriggerElementId: "eventbrite-widget-modal-trigger",
      onOrderComplete,
    });
  }, [eventId, status, plausible]);

  return (
    <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
      <noscript>
        <a
          href={`https://www.eventbrite.it/e/${eventId}`}
          rel="noopener noreferrer"
          target="_blank"
          className="w-full bg-pink-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:w-auto sm:inline-flex"
        >
          Riserva il tuo posto
        </a>
      </noscript>
      <button
        id="eventbrite-widget-modal-trigger"
        type="button"
        className="w-full bg-pink-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:w-auto sm:inline-flex"
      >
        Riserva il tuo posto
      </button>
    </div>
  );
};
