import NextAuth from 'next-auth';
import type { DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import { findUserByEmail, upsertGoogleUser } from '@/server/repositories/users';

declare module 'next-auth' {
  interface Session {
    user: { id: string } & DefaultSession['user'];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 2,
  },
  callbacks: {
    authorized({ auth }) {
      return Boolean(auth?.user);
    },
    async jwt({ token }) {
      if (!token.id && token.email) {
        const user = await findUserByEmail(token.email);
        if (user) token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string | undefined) ?? '';
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return false;

      const email = user.email.trim().toLowerCase();

      await upsertGoogleUser({
        name: user.name?.trim() || email,
        email,
        picture: user.image ?? null,
      });

      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === new URL(baseUrl).origin) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.AUTH_SECRET,
});
