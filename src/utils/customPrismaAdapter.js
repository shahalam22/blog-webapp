import { PrismaClient } from '@prisma/client';
import { Adapter } from 'next-auth';

const prisma = new PrismaClient();

export function CustomPrismaAdapter(p) {
  return {
    ...Adapter(p),

    async getUser(id) {
      return prisma.user.findUnique({
        where: { id },
      });
    },

    async getUserByEmail(email) {
      return prisma.user.findUnique({
        where: { email },
      });
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        include: {
          user: true,
        },
      });
      return account?.user || null;
    },

    async updateUser(user) {
      const { id, ...data } = user;
      return prisma.user.update({
        where: { id },
        data,
      });
    },

    async deleteUser(userId) {
      return prisma.user.delete({
        where: { id: userId },
      });
    },

    async linkAccount(account) {
      return prisma.account.create({
        data: account,
      });
    },

    async unlinkAccount({ provider, providerAccountId }) {
      return prisma.account.delete({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
      });
    },

    async createSession(session) {
      return prisma.session.create({
        data: session,
      });
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });

      if (!session) return null;
      const { user, ...sessionData } = session;
      return { session: sessionData, user };
    },

    async updateSession(session) {
      const { sessionToken, ...data } = session;
      return prisma.session.update({
        where: { sessionToken },
        data,
      });
    },

    async deleteSession(sessionToken) {
      return prisma.session.delete({
        where: { sessionToken },
      });
    },

    async createVerificationToken(verificationToken) {
      return prisma.verificationToken.create({
        data: verificationToken,
      });
    },

    async useVerificationToken({ identifier, token }) {
      try {
        return await prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier,
              token,
            },
          },
        });
      } catch (err) {
        return null;
      }
    },
  };
}
