import NextAuth from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import { verifyPassword } from '../../../lib/auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
    jwt: {
      maxAge: 30 * 24 * 60 * 60,
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error('No user found');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in');
        }

        return user;

        // return {
        //   email: user.email,
        //   user_id: user.id,
        // };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log(token, account);
      console.log('in JWT CALLBACK');
      if (user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user.userId = parseInt(token.sub);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
