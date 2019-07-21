import {createStore} from "./createStore";
import {act, renderHook} from "@testing-library/react-hooks";
import {useStore} from "./useStore";
import {cleanup} from "@testing-library/react";

describe('useStore', () => {
    let wrapper;

    beforeEach(() => {
        const model = {
            count: 0,
            obj: {
                nested: {
                    value: 200
                }
            },
            increment: function () {
                this.count++;
            },
            decrement: function () {
                this.count--;
            },
            reset: function () {
                this.count = 0;
            }
        };

        const store = createStore(model);
        wrapper = renderHook(() => useStore(store));
    });

    afterEach(cleanup);

    it('should throw TypeError', () => {
        expect(() => useStore({})).toThrow(TypeError);
    });

    it('should works correctly when model has nested objects', () => {
        expect(wrapper.result.current.obj.nested.value).toBe(200);
    });

    it('should increment counter', () => {
            act(() => {
                wrapper.result.current.increment();
                wrapper.result.current.increment();
                wrapper.result.current.increment();
            });
            expect(wrapper.result.current.count).toBe(3);
        }
    );

    it('should decrement counter', () => {
            act(wrapper.result.current.decrement);
            expect(wrapper.result.current.count).toBe(-1);
        }
    );

    it('should reset counter', () => {
            act(() => {
                wrapper.result.current.increment();
                wrapper.result.current.increment();
                wrapper.result.current.increment();
            });
            expect(wrapper.result.current.count).toBe(3);

            act(wrapper.result.current.reset);
            expect(wrapper.result.current.count).toBe(0);
        }
    );
});