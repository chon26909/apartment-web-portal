import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const user = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = request.nextUrl;

    const isAuthRoute = ['/profile', '/protected'].includes(pathname);

    if (isAuthRoute && (!user || user.role !== 'admin')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}
