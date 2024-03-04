import { UserRole } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
    id: number;
    role: string;
    image: string;
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }

    interface User {
        role: string;
        image: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: string;
        image: string;
    }
}
