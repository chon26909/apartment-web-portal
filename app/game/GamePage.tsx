'use client';
import React, { useEffect, useState } from 'react';

const GamePage = () => {
    const initTable = new Array(9).fill('');
    const [data, setData] = useState(initTable);

    const checkSomeOneIsWin = (d: string[], [a, b, c]: number[]) => {
        const patternStr = [d[a], d[b], d[c]].join('');
        switch (patternStr) {
            case 'XXX':
                return 'X';
            case 'OOO':
                return 'O';
            default:
                return '';
        }
    };

    const checkTheWinner = () => {
        const patternIsWin = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < patternIsWin.length; i++) {
            const winner = checkSomeOneIsWin(data, patternIsWin[i]);

            if (winner === 'X' || winner === 'O') {
                alert('The Winner is player: ' + winner);
                setData(initTable);
                return true;
            }
        }

        return false;
    };

    const checkIsDraw = () => data.filter((item) => item == '').length == 0;

    const handlerClick = (index: number) => {
        if (data[index] == '') {
            const myRound = data.filter((a) => a === '').length % 2 ? true : false;

            setData((state) => {
                state[index] = myRound ? 'X' : 'O';
                return [...state];
            });
        }
    };

    useEffect(() => {
        setTimeout(() => {
            console.log('data', data);
            if (checkTheWinner()) {
            } else if (checkIsDraw()) {
                alert('Draw!!!');
            }
        }, 1);
    }, [data]);

    return (
        <div className='mt-10 flex justify-center items-center flex-col'>
            <div className='font-bold text-2xl'>Game</div>
            <div className='text-xl'>
                <div>Player: X</div>
                <div>Player: O</div>
            </div>
            <GameTable data={data} handleClick={handlerClick} />
        </div>
    );
};

export default GamePage;

interface ITable {
    data: string[];
    handleClick: (index: number) => void;
}
const GameTable = (props: ITable) => {
    return (
        <div className='mt-5 bg-green-200 w-[300px] h-[300px] border border-spacing-10 border-red-800'>
            <div className='grid grid-cols-3 cursor-pointer'>
                {props.data.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => props.handleClick(i)}
                        className='w-[100px] h-[100px] border-2 border-green-800 font-bold text-[60px] text-center'
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};
