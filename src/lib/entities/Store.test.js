import {Store} from "./Store";

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
        store.getModel().increment();
        expect(func).toBeCalledTimes(1);
    });

    describe('watch', () => {
        const store = new Store(observedState);

       it('should triggers watcher', () => {
           const watcher = jest.fn();
           store.watch(watcher);
           store.getModel().increment();
           expect(watcher).toBeCalledTimes(1);
       });

        it('unwatch should works correctly', () => {
            const watcher = jest.fn();
            const unwatch = store.watch(watcher);
            unwatch();
            store.getModel().increment();
            expect(watcher).toBeCalledTimes(0);
        });
    });

    describe('watchProp', () => {
        const store = new Store(observedState);

        it('should triggers watcher', () => {
            const watcher = jest.fn();
            store.watchProp('count', watcher);
            store.getModel().increment();
            expect(watcher).toBeCalledTimes(1);
            expect(watcher).toBeCalledWith(0, 1);
        });

        it('unwatch should works correctly', () => {
            const watcher = jest.fn();
            const unwatch = store.watchProp('count', watcher);
            unwatch();
            store.getModel().increment();
            expect(watcher).toBeCalledTimes(0);
        });
    });
});