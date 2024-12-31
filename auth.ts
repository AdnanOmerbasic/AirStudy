import Credentials from "next-auth/providers/credentials";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema/userSchema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    isAdmin: boolean | null;
  }
  interface Session {
    user: {
      isAdmin: boolean | null;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(userTable)
          .where(eq(userTable.email, credentials.email as string));

        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }
        if (!user) {
          throw new Error("Email or password is incorrect");
        }

        const validPassword = await bcrypt.compare(
          credentials.password as string,
          user.passwordHashed
        );

        if (!validPassword) {
          throw new Error("Email or password is incorrect");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.isAdmin = token.isAdmin as boolean;
      return session;
    },
  },
});
