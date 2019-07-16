import React from 'react';
import './Counter.css';
import {globalStore} from "./store";
import {useStore} from "../lib";

export const Counter = () => {
    const {count, increment, decrement, reset} = useStore(globalStore);

    return (
        <div className="App">
            <div>Counter {count}</div>
            <div className='counterButtons'>
                <button className='button' onClick={increment}>+</button>
                <button className='button' onClick={decrement}>-</button>
                <button className='button' onClick={reset}>Reset</button>
            </div>
        </div>
    );
};
