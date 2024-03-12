import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';

import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import authConfig from '@/auth.config';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user }) {
            if (user) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: String(user.email) }
                });

                console.log('existing user', existingUser);

                //const existingUser = await getUserById(user.id as string);

                if (!existingUser || !existingUser.emailVerified) {
                    return false;
                }
            }

            return true;
        },
        jwt: async ({ token, user }: { token: JWT; user: User | AdapterUser }) => {
            console.log('token', token);
            console.log('user', user);

            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.image = user.image;
            }
            return token;
        },
        session: async ({ session, token }: { session: Session; token: JWT }) => {
            if (session.user) {
                session.user.id = Number(token.id);
                session.user.role = token.role;
                session.user.image = token.image;
            }
            return session;
        },
        async redirect({ baseUrl }) {
            return `${baseUrl}/profile`;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
