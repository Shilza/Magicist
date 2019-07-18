import {Counter} from "./Counter";
import React from "react";
import {act, cleanup, fireEvent, render, waitForElement} from '@testing-library/react';
import {createStore} from "../lib/api";
import {model} from "./store";

describe('Counter', () => {
    let wrapper;

    beforeEach(() => {
        const store = createStore(model);
        wrapper = render(<Counter store={store}/>);
    });

    afterEach(cleanup);

    it('should renders without crashing', () => {
        expect(wrapper.container).toBeInTheDocument();
    });

    it('count should have default value',  () => {
        const count = wrapper.getByTestId('count');
        expect(count).toHaveTextContent('0');
    });

    it('count should be greater than default by 1', async () => {
        const incrementButton = wrapper.getByTestId('increment');
        act(() => {
            fireEvent.click(incrementButton)
        });
        const count = await waitForElement(
            () => wrapper.getByTestId('count')
        );
        expect(count).toHaveTextContent('1');
    });

    it('count should be less than default by 1', async () => {
        const decrementButton = wrapper.getByTestId('decrement');
        act(() => {
            fireEvent.click(decrementButton)
        });
        const count = await waitForElement(
            () => wrapper.getByTestId('count')
        );
        expect(count).toHaveTextContent('-1');
    });

    it('count should be equal with default after resetting', async () => {
        const incrementButton = wrapper.getByTestId('increment');
        const resetButton = wrapper.getByTestId('reset');

        act(() => {
            fireEvent.click(incrementButton);
            fireEvent.click(incrementButton);
            fireEvent.click(incrementButton);
        });

        let count = await waitForElement(
            () => wrapper.getByTestId('count')
        );
        expect(count).toHaveTextContent('3');

        act(() => {
            fireEvent.click(resetButton)
        });
        count = await waitForElement(
            () => wrapper.getByTestId('count')
        );
        expect(count).toHaveTextContent('0');
    });
});