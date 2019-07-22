import {Store} from "./Store";

describe('Store', () => {
    const func = jest.fn();
    const model = {
        count: 0,
        obj: {
            nested: {
                value: 100
            }
        },
        increment: function() {
            this.count++;
        },
        changeNested: function() {
            this.obj.nested.value++;
        }
    };
    const store = new Store(model, [func]);

    it('should create Store', () => {
        expect(store).toBeInstanceOf(Store);
    });

    it('should call Middleware', () => {
        store.getModel().increment();
        expect(func).toBeCalledTimes(1);
    });

    describe('watch', () => {
        const store = new Store(model);

       it('should triggers watcher',() => {
           const watcher = jest.fn();
           store.watch(watcher);
           store.getModel().increment();
           expect(watcher).toBeCalledTimes(1);
       });

        it('disposer should works correctly', () => {
            const watcher = jest.fn();
            const disposer = store.watch(watcher);
            disposer();
            store.getModel().increment();
            expect(watcher).toBeCalledTimes(0);
        });
    });

    describe('watchProp', () => {
        const store = new Store(model);

        it('should triggers watcher by string path', () => {
            const watcher = jest.fn();
            store.watchProp('count', watcher);
            store.getModel().increment();
            expect(watcher).toBeCalledTimes(1);
            expect(watcher).toBeCalledWith(0, 1);
        });

        it('shouldn\'t triggers watcher(same value)', () => {
            const model = {
                count: 0
            };
            const store = new Store(model);

            const watcher = jest.fn();
            store.watchProp('count', watcher);
            store.getModel().count = 0;
            expect(watcher).toBeCalledTimes(0);
        });

        it('should triggers watcher by array path', () => {
            const model = {
                count: 0,
                obj: {
                    nested: {
                        value: 100
                    }
                },
                increment: function() {
                    this.count++;
                },
                changeNested: function() {
                    this.obj.nested.value++;
                }
            };
            const store = new Store(model);

            const watcher = jest.fn();
            store.watchProp(['obj', 'nested', 'value'], watcher);
            store.getModel().changeNested();
            expect(watcher).toBeCalledTimes(1);
            expect(watcher).toBeCalledWith(100, 101);
        });

        it('disposer should works correctly', () => {
            const watcher = jest.fn();
            const disposer = store.watchProp('count', watcher);
            disposer();
            store.getModel().increment();
            expect(watcher).toBeCalledTimes(0);
        });

    });
});