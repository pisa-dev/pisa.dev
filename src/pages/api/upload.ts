import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import { z, ZodError } from "zod";

if (!env.AWS_SERVER_ADDRESS || !env.AWS_ACCESS_KEY || !env.AWS_SECRET_KEY || !env.AWS_BUCKET_NAME) {
  throw new Error('Impossible to retrieve all the required information to configure AWS Client!');
}

const s3Client = new S3Client({
  region: "auto",
  endpoint: env.AWS_SERVER_ADDRESS,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  }
});

export const s3Upload = async (key: string, file: Blob) => {
  await s3Client.send(
    new PutObjectCommand({
      Body: file,
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    }),
  );
  return `${env.AWS_SERVER_ADDRESS}/${env.AWS_BUCKET_NAME}/${key}`;
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  try {
    const { key, value } = z.object({
      key: z.string(),
      value: z.custom<Blob>(),
    }).parse(req.body);

    const addr = await s3Upload(key, value);
    
    res.status(200);
    res.send(addr);
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400);
      res.send(e);
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  }
};

export default uploadFile;