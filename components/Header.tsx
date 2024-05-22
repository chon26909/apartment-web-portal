import React from 'react';
import { getServerSession } from 'next-auth';
import Logout from './Logout';

const Header = async () => {
    const session = await getServerSession();

    return (
        <header className='bg-green-500'>
            <div>Admin</div>
            <div>{session?.user.image}</div>
            <Logout />
        </header>
    );
};

export default Header;
