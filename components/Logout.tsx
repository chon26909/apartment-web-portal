'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

const Logout = () => {
    return <button onClick={() => signOut({ callbackUrl: '/profile' })}>logout</button>;
};

export default Logout;
