import {createStore} from "./createStore";
import {act, renderHook} from "@testing-library/react-hooks";
import {useStore} from "./useStore";

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