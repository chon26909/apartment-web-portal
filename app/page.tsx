import React from 'react';
import { getServerSession } from 'next-auth';

const HomePage = async () => {
    const session = await getServerSession();

    return (
        <div>
            <div>HomePage</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
};

export default HomePage;
