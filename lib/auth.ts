import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { sql } from "@/lib/db";
import { fetchDataUser } from "@/query/users/data";

declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 2,
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await fetchDataUser(user.email!);
        if (!existingUser) {
          await sql`
            INSERT INTO public.users ( name, email, picture )
            VALUES (${user.name}, ${user.email}, ${user.image})
          `;
        } else {
          await sql`
            UPDATE public.users
            SET picture = ${user.image}
            WHERE email = ${user.email}
          `;
        }
      }
      return true;
    },
    async redirect({ baseUrl }: { url: string; baseUrl: string }) {
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
