import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import routes from '@/lib/config/routes';
import Google from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { sendVerificationRequest } from './sendEmail';

import prisma from '../init/prisma';

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    EmailProvider({
      server: {
        host: 'localhost',
        port: 1025,
        auth: {
          user: '',
          pass: ''
        }
      },
      from: 'no-reply@localhost',
      sendVerificationRequest
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  pages: {
    signIn: routes.redirects.auth.toLogin
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    }
  }
});
