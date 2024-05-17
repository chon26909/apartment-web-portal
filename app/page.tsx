import React from 'react';
import { getServerSession } from 'next-auth';
import Home from './game/GamePage';

const HomePage = async () => {
    // const session = await getServerSession();

    return (
        <div>
            <div>HomePage</div>
            {/* <Home /> */}
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        </div>
    );
};

export default HomePage;
