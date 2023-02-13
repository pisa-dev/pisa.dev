import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "process";

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

export const s3Upload = async (key: string, file: Buffer) => {
  await s3Client.send(
    new PutObjectCommand({
      Body: file,
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    }),
  );
  return `${env.AWS_SERVER_ADDRESS}/${env.AWS_BUCKET_NAME}/${key}`;
}