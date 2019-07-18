import {createStore} from "../lib/api";

export const model = {
    count: 0,
    increment: function() {
        this.count++;
    },
    decrement: function() {
        this.count--;
    },
    reset: function() {
        this.count = 0;
    }
};

export const globalStore = createStore(model);