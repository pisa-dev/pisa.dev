import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import requestIp from "request-ip";
import { prisma } from "~/server/db";

const outboundJobOffer = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const offer = await prisma.jobOffer.findFirst({ where: { id } });

  if (!offer) {
    res.status(404);
    return;
  }

  const clientIp = requestIp.getClientIp(req);
  const trackingUrl = new URL("https://stats.pisa.dev/count");
  trackingUrl.searchParams.set("p", `job-offer-out/${id}`);
  trackingUrl.searchParams.set("e", "1");
  await fetch(trackingUrl, {
    headers: {
      "user-agent": req.headers["user-agent"] || "",
      "x-forwarded-for": clientIp || "",
    },
  });

  if (offer.offerURL.includes("@") && !offer.offerURL.startsWith("http")) {
    res.redirect(307, `https://pisa.dev/jobs/mailto?address=${offer.offerURL}`);
  } else {
    res.redirect(307, offer.offerURL);
  }
};

export default outboundJobOffer;
