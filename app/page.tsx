import SwipeButton from '@/components/SwipeButton';
import SwipeButtonExample from '@/components/SwipeButtonExample';
import React from 'react';

const HomePage = async () => {
    // const session = await getServerSession();

    return (
        <div>
            {/* <div>HomePage</div> */}
            {/* <Home /> */}
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
            {/* <div className='p-10'>
                <SwipeButtonExample />
            </div> */}
            <div className='p-[50px]'>
                <SwipeButton />
            </div>
        </div>
    );
};

export default HomePage;
