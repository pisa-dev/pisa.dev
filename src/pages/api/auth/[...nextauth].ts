import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "error",
      clientSecret: process.env.GOOGLE_SECRET || "error",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "error",
      clientSecret: process.env.GITHUB_SECRET || "error",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      if (user.admin) {
        session.user.admin = user.admin;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
