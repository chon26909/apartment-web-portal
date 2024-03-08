import { getToken } from 'next-auth/jwt';
import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authConfig from '@/auth.config';
import { publicRoutes } from './routes';

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
    console.log(req);
});

export async function middleware(request: NextRequest) {
    // const isLoggedIn = !!request.auth;
    // console.log('isLoggedIn', isLoggedIn);

    const { pathname } = request.nextUrl;

    const user = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const isPublicRoute = publicRoutes.includes(pathname);

    //const isAuthRoute = ['/profile', '/protected'].includes(pathname);

    // if (!user || user.role !== 'admin') {
    //     return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
    // }

    return NextResponse.next();
}
