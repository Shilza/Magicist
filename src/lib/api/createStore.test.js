import {createStore} from "./createStore";

describe('createStore', () => {
    it('should throw TypeError', () => {
        expect(() => createStore(0)).toThrow(TypeError);
    });

    it('should return store', () => {
        const store = createStore({
            count: 0
        });
        expect(typeof store).toBe('object');
    });
});