import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const tokenId = (req.query.id as string) || "";

  const dbRes = await prisma.newsletterSubscription.updateMany({
    data: {
      verified: true,
    },
    where: {
      id: tokenId,
      verified: false,
    },
  });

  if (dbRes.count == 0) {
    res.status(400);
    res.json({ error: "bad request" });
  }

  res.redirect(302, "/?email_verified=true");
};

export default get;
