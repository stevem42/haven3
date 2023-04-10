import NextAuth, { NextAuthOptions } from 'next-auth';
import { prisma } from '../../../lib/prisma';
import { verifyPassword } from '../../../lib/auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',

    //   jwt: {
    //     maxAge: 30 * 24 * 60 * 60,
    //   },
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          throw new Error('No Matching User Found');
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error('Could not log you in');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      user && (token.sub = user?.id);
      return token;
    },
    async session({ session, token, user }) {
      if (token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
