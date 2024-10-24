'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

const SwipeButton = () => {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const draggableRef = useRef<HTMLDivElement>(null);
    const slideEffectRef = useRef<HTMLDivElement>(null);

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

                if (draggableRef.current && slideEffectRef.current) {
                    draggableRef.current.style.transition = '0.5s ease-in-out';

                    draggableRef.current;

                    const containWidth = constraintsRef.current?.clientWidth as number;
                    const diff = 30;

                    if (event.clientX < containWidth - diff) {
                        draggableRef.current.style.transform = 'none';
                        setIsConfirmed(false);
                        draggableRef.current.classList.remove('text-blur');
                    } else {
                        draggableRef.current.style.transform = `translateX(${containWidth - 75}px)`;
                        draggableRef.current.classList.remove('text-blur');
                        slideEffectRef.current.style.animationIterationCount = 'initial';
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

            console.log('clientX', event.clientX);

            if (draggableRef.current && slideEffectRef.current) {
                const containWidth = constraintsRef.current?.clientWidth as number;

                draggableRef.current.style.transition = 'none';
                draggableRef.current.classList.add('text-blur');

                slideEffectRef.current.classList.add('active');

                // console.log('children', draggableRef.current);

                if (event.clientX < containWidth) {
                    draggableRef.current.style.transform = `translateX(${event.clientX - 80}px)`;
                } else {
                    draggableRef.current.style.transform = `translateX(${containWidth - 75}px)`;
                    draggableRef.current.classList.remove('text-blur');
                    slideEffectRef.current.style.animationIterationCount = 'initial';
                    setDrag(false);
                    setIsConfirmed(true);
                }
            }
        };

        if (drag) {
            document.body.addEventListener('pointermove', pointerMoveListener);
            return () => document.body.removeEventListener('pointermove', pointerMoveListener);
        }
    }, [drag, constraintsRef, draggableRef]);

    return (
        <div>
            <div
                className='w-full h-[70px] relative overflow-hidden rounded-full'
                ref={constraintsRef}
            >
                <div
                    className={['swipe-slide', isConfirmed && 'active'].join(' ')}
                    ref={draggableRef}
                >
                    <div>{''}</div>
                    <div className='text font-sarabun'>ยืนยันสำเร็จ</div>
                    <div
                        className='bg-white rounded-full border-1 p-4 cursor-pointer'
                        onPointerDown={handlePointerDown}
                    >
                        {isConfirmed ? (
                            <FaCheck className='text-green-700 text-[26px]' />
                        ) : (
                            <FaArrowRight className='text-gray-400 text-[26px]' />
                        )}
                    </div>
                    <div className='text font-sarabun'>เลื่อนเพื่อยืนยัน</div>
                    <div>{''}</div>
                    <div className='swipe-slide-effect' ref={slideEffectRef}>
                        {''}
                    </div>
                </div>
            </div>
            <div className='mt-5'>confirm: {isConfirmed ? 'true' : 'false'}</div>
        </div>
    );
};

export default SwipeButton;
