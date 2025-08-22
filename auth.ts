import NextAuth from "next-auth";
import Line from "next-auth/providers/line";
import Facebook from "next-auth/providers/facebook";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Line({
      clientId: process.env.AUTH_LINE_ID,
      clientSecret: process.env.AUTH_LINE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      const existingAccount = await prisma.account.findFirst({
        where: {
          providerAccountId: account?.providerAccountId,
        },
      });

      if (!existingAccount) {
        const newUser = await prisma.user.create({
          data: {
            name: user.name || profile?.name,
            picture: user.image || profile?.picture,
            email: user.email,
          },
        });

        await prisma.account.create({
          data: {
            userId: newUser.id,
            provider: account?.provider as string,
            providerAccountId: account?.providerAccountId as string,
          },
        });

        user.id = newUser.id;
      } else {
        user.id = existingAccount.userId;
      }

      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            Account: {
              select: {
                providerAccountId: true,
                provider: true,
              },
            },
          },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
          token.picture = dbUser.picture;
          token.name = dbUser.name;
          token.role = dbUser.role;
          token.providerAccountId = dbUser.Account.at(0)?.providerAccountId;
          token.provider = dbUser.Account.at(0)?.provider;
        }
      }

      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.picture = token.picture;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.providerAccountId = token.providerAccountId;
        session.user.provider = token.provider;
      }

      return session;
    },
  },
});
