import {
    createStore,
    useStore
} from "./api";

describe('lib index', () => {
    it('should import createStore', () => {
        expect(createStore).toBeTruthy();
    });

    it('should import useStore', () => {
        expect(useStore).toBeTruthy();
    });
});