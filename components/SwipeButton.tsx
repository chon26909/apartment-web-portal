'use client';

import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const SwipeButton = () => {
    const constraintsRef = React.useRef<HTMLDivElement>(null);
    const draggableRef = React.useRef<HTMLDivElement>(null);

    const [drag, setDrag] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handlePointerDown = (event: React.PointerEvent) => {
        // console.log('movestart - pointer x: ', event);
        setDrag(true);
    };

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (isConfirmed) return;

            if (event.relatedTarget == null) {
                setDrag(false);

                if (draggableRef.current) {
                    draggableRef.current.style.transition = '0.5s ease-in-out';

                    draggableRef.current;

                    const containWidth = constraintsRef.current?.clientWidth as number;
                    const diff = 30;

                    if (event.clientX < containWidth - diff) {
                        draggableRef.current.style.transform = 'none';
                        setIsConfirmed(false);
                    } else {
                        draggableRef.current.style.transform = `translateX(${containWidth - 75}px)`;
                        //  draggableRef.current.style.backgroundColor = '#68ab1e';
                        setDrag(false);
                        setIsConfirmed(true);
                    }
                }
            }
        };
        document.addEventListener('mouseup', listener);

        return () => document.removeEventListener('mouseup', listener);
    }, []);

    useEffect(() => {
        const pointerMoveListener = (event: PointerEvent) => {
            if (isConfirmed) return;

            console.log('.');

            console.log('clientX', event.clientX);

            if (draggableRef.current) {
                const containWidth = constraintsRef.current?.clientWidth as number;

                draggableRef.current.style.transition = 'none';
                // draggableRef.current.children[3].s .style.color = 'rgba(0, 0, 0, 0.1)';

                if (event.clientX < containWidth) {
                    draggableRef.current.style.transform = `translateX(${event.clientX - 80}px)`;
                } else {
                    draggableRef.current.style.transform = `translateX(${containWidth - 75}px)`;
                    // draggableRef.current.style.backgroundColor = '#68ab1e';
                    setDrag(false);
                    setIsConfirmed(true);
                }
            }
        };

        if (drag) {
            document.body.addEventListener('pointermove', pointerMoveListener);
            // setIsConfirmed(false);
            return () => document.body.removeEventListener('pointermove', pointerMoveListener);
        }
    }, [drag, constraintsRef, draggableRef]);

    return (
        <div>
            <div
                className='w-full h-[80px] relative border-yellow-950 overflow-hidden rounded-full'
                ref={constraintsRef}
            >
                <div
                    className={['swipe-slide', isConfirmed && 'active'].join(' ')}
                    ref={draggableRef}
                >
                    <div>{''}</div>
                    <div className='font-sarabun'>ยืนยันสำเร็จ</div>
                    <div
                        className='bg-white rounded-full border-1 p-5 cursor-pointer'
                        onPointerDown={handlePointerDown}
                    >
                        <FaArrowRight className='text-gray-500 text-[26px]' />
                    </div>
                    <div className='font-sarabun'>เลื่อนเพื่อยืนยัน</div>
                    <div>{''}</div>
                </div>
            </div>
            <div className='mt-5'>confirm: {isConfirmed ? 'true' : 'false'}</div>
        </div>
    );
};

export default SwipeButton;
