import {renderHook, act} from '@testing-library/react-hooks';
import {createStore, useStore} from "./index";

describe('Exported functions', () => {
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

    describe('useStore', () => {
        const store = createStore({
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

        const {result} = renderHook(() => useStore(store));

        it('should throw TypeError', () => {
            expect(() => useStore({})).toThrow(TypeError);
        });

        it('should increment counter', () => {
                act(() => {
                    result.current.increment();
                    result.current.increment();
                    result.current.increment();
                });
                expect(result.current.count).toBe(3);
            }
        );

        it('should decrement counter', () => {
                act(result.current.decrement);
                expect(result.current.count).toBe(2);
            }
        );

        it('should reset counter', () => {
                act(result.current.reset);
                expect(result.current.count).toBe(0);
            }
        );
    });
});