import {createStore} from "./createStore";
import {act, renderHook} from "@testing-library/react-hooks";
import {useStore} from "./useStore";
import {cleanup} from "@testing-library/react";
import {model} from "../../examples/store";

describe('useStore', () => {
    let wrapper;

    beforeEach(() => {
        const store = createStore(model);
        wrapper = renderHook(() => useStore(store));
    });

    afterEach(cleanup);

    it('should throw TypeError', () => {
        expect(() => useStore({})).toThrow(TypeError);
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