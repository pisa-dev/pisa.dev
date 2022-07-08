import NextAuth, { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    admin: boolean;
  }

  interface Session {
    user: {
      admin?: boolean;
    } & DefaultSession["user"];
  }
}
