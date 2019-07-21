import {createStore} from "./createStore";

describe('createStore', () => {
    it('should throw TypeError(store is not an object)', () => {
        expect(() => createStore(0)).toThrow(TypeError);
    });

    it('should throw TypeError(middlewares is not a array)', () => {
        expect(() => createStore({}, 'not an array')).toThrow(TypeError);
    });

    it('should throw TypeError(middlewares entry is not a function)', () => {
        expect(() => createStore({}, ['not a function'])).toThrow(TypeError);
    });

    it('should return store', () => {
        const store = createStore({
            count: 0
        });
        expect(typeof store).toBe('object');
    });
});