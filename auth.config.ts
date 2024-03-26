import { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: '' },
                password: { label: 'Password', type: 'password', placeholder: '' }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    return new Promise((resolve, reject) => {
                        reject(new Error('Email not found'));
                    });
                }

                if (user && (await bcrypt.compare(credentials.password, String(user.password)))) {
                    const data = new Promise<User>((resolve) =>
                        resolve({
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email,
                            image: '',
                            role: user.role
                        })
                    );

                    return data;
                }
                return new Promise((resolve, reject) => {
                    reject(new Error('Password incorrect'));
                });
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
    ]
};
