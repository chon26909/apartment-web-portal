import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '../[...nextauth]/route';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    console.log('session', session);

    return Response.json({
        message: 'success',
        data: session?.user
    });
}
