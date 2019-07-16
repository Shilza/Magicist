import {createStore} from "../lib";

export const globalStore = createStore({
    count: 0,
    increment: function () {
        this.count++;
    },
    decrement: function () {
        this.count--;
    },
    reset: function () {
        this.count = 0;
    }
});
