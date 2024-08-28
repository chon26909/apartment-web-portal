// import { getToken } from 'next-auth/jwt';
// import NextAuth from 'next-auth';
// import { NextRequest, NextResponse } from 'next/server';
// import authConfig from '@/auth.config';
// import { publicRoutes } from './routes';

//const { auth } = NextAuth(authConfig);

// export default auth((req: any) => {
//     console.log('auth middleware', req);
// });

// export async function middleware(request: NextRequest) {
//     // const isLoggedIn = !!request.auth;
//     // console.log('isLoggedIn', isLoggedIn);

//     const { pathname } = request.nextUrl;

//     const user = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

//     const isPublicRoute = publicRoutes.includes(pathname);

//     const isAuthRoute = ['/profile', '/protected'].includes(pathname);

//     if (!user || (user.role !== 'admin' && isAuthRoute)) {
//         return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
//     }

//     return NextResponse.next();
// }

import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

// export default withAuth(
//     function middleware(req) {
//         console.log('token', req.nextauth.token);
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => {
//                 console.log('auth ', token);

//                 if (token) {
//                     return true;
//                 }

//                 return false;
//             }
//         },
//         pages: {
//             signIn: '/auth/login',
//             error: '/error'
//         }
//     }
// );

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("middleware called")
    return NextResponse.redirect(new URL('/home', request.url))
}
export const config = { matcher: ['/'] };
