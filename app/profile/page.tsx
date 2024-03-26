'use client';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';

const ProfilePage = () => {
    const { data: session, status } = useSession();

    return (
        <div>
            <div>ProfilePage</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <div>status: {status}</div>
            <button className='bg-red-500 p-3 m-4' onClick={() => signOut()}>
                LogOut
            </button>
        </div>
    );
};

export default ProfilePage;
