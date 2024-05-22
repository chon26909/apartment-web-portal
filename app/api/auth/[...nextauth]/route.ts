import NextAuth, { AuthOptions, Session, User } from 'next-auth';

import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
// import authConfig from '@/auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: '' },
                password: { label: 'Password', type: 'password', placeholder: '' }
            },
            async authorize(credentials, req) {
                // if (!credentials) return null;
                // const user = await prisma.user.findUnique({
                //     where: { email: credentials.email }
                // });

                // if (!user) {
                //     return new Promise((resolve, reject) => {
                //         reject(new Error('Email not found'));
                //     });
                // }

                // if (user && (await bcrypt.compare(credentials.password, String(user.password)))) {
                //     const data = new Promise<User>((resolve) =>
                //         resolve({
                //             id: user.id.toString(),
                //             name: user.name,
                //             email: user.email,
                //             image: '',
                //             role: user.role
                //         })
                //     );

                //     return data;
                // }
                // return new Promise((resolve, reject) => {
                //     reject(new Error('Password incorrect'));
                // });

                const data = new Promise<User>((resolve) =>
                    resolve({
                        id: '12345',
                        name: 'Admin',
                        email: credentials?.email,
                        image: '',
                        role: 'ADMIN'
                    })
                );

                return data;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                console.log('google profile', profile);

                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.image,
                    role: 'MEMBER'
                };
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user }) {
            if (user) {
                // const existingUser = await prisma.user.findUnique({
                //     where: { email: String(user.email) }
                // });

                let existingUser = true;

                console.log('existing user', existingUser);

                //const existingUser = await getUserById(user.id as string);

                // if (!existingUser || !existingUser.emailVerified) {
                //     return false;
                // }
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
        async redirect({ url, baseUrl }) {
            console.log('baseUrl', baseUrl);
            console.log('url', url);

            // // Allows relative callback URLs
            // if (url.startsWith('/')) return `${baseUrl}${url}`;
            // // Allows callback URLs on the same origin
            // else if (new URL(url).origin === baseUrl) return url;

            const callbackUrl = url.split('?callbackUrl=%2F');

            if (callbackUrl[1]) {
                console.log('callbackUrl', callbackUrl);

                return '/' + callbackUrl[1];
            }

            return '/';
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
