import NextAuth from 'next-auth';
import type { DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import { env } from '@/lib/env';
import { logError } from '@/lib/logger';
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
      clientId: env().AUTH_GOOGLE_ID,
      clientSecret: env().AUTH_GOOGLE_SECRET,
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
    async signIn({ user, account }) {
      if (account?.provider !== 'google' || !user.email) return false;

      const email = user.email.trim().toLowerCase();
      const dbUser = await upsertGoogleUser({
        name: user.name?.trim() || email,
        email,
        picture: user.image ?? null,
      });

      // Repassa o id do banco para o primeiro JWT; evita uma consulta extra.
      user.id = dbUser.id;

      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;

      if (!token.id && token.email) {
        try {
          const dbUser = await findUserByEmail(token.email);
          if (dbUser) token.id = dbUser.id;
        } catch (error) {
          // Não derruba o login inteiro por uma falha momentânea de banco.
          logError('auth.jwt.resolve_user_failed', error, { email: token.email });
        }
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
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === new URL(baseUrl).origin) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  // AUTH_SECRET é o nome do v5; NEXTAUTH_SECRET mantém compatibilidade com
  // deploys que já existiam antes do refactor.
  secret: env().AUTH_SECRET,
});
