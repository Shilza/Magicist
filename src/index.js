import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Counter} from './examples/Counter';
import {globalStore} from "./examples/store";

const renderToDom = container => {
    if (container)
        ReactDOM.render(<Counter store={globalStore}/>, container);
    else
        console.error('root element is not defined');
};

const root = document.getElementById('root');
renderToDom(root);

export { renderToDom };
