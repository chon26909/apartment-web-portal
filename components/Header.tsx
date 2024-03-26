import React from 'react';
import { getServerSession } from 'next-auth';

const Header = async () => {
    const session = await getServerSession();

    return (
        <header className='bg-green-500'>
            <div>Admin</div>
            <div>{session?.user.image}</div>
        </header>
    );
};

export default Header;
