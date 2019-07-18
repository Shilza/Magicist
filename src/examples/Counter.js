import React from 'react';
import './Counter.css';
import {useStore} from "../lib";

export const Counter = ({store}) => {
    const {count, increment, decrement, reset} = useStore(store);

    return (
        <div className="App">
            <div data-testid='count'>Counter {count}</div>
            <div className='counterButtons'>
                <button
                    data-testid='increment'
                    className='button'
                    onClick={increment}
                >
                    +
                </button>
                <button
                    data-testid='decrement'
                    className='button'
                    onClick={decrement}
                >
                    -
                </button>
                <button
                    data-testid='reset'
                    className='button'
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
