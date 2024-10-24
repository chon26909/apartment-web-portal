import React from 'react';
import './SwipeButtonExample.scss';
import { FaArrowRight } from 'react-icons/fa';

const SwipeButtonExample = () => {
    return (
        <div className='btn-container'>
            <div className='btn'>
                <div className='text'>Swipe Me</div>
                <span draggable>
                    <FaArrowRight className='text-gray-500' />
                </span>
            </div>
        </div>
    );
};

export default SwipeButtonExample;
