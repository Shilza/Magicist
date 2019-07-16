import {Store} from "./Store";
import {useStore} from "../index";
import {renderHook} from "@testing-library/react-hooks";

describe('Store', () => {
    const func = jest.fn();
    const observedState = {
        count: 0,
        increment: function() {
            this.count++;
        }
    };
    const store = new Store(observedState, [func]);

    it('should create Store', () => {
        expect(store).toBeInstanceOf(Store);
    });

    it('should call middleware', () => {
        const {result} = renderHook(() => useStore(store));
        result.current.increment();
        expect(func).toBeCalledTimes(1);
    });
});