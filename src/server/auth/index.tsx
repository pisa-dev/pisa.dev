import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface Context {
  req: NextApiRequest;
  res: NextApiResponse<unknown>;
}

export const getServerSession = (ctx: Context) =>
  unstable_getServerSession(ctx.req, ctx.res, authOptions);
