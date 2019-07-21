import {DeepProxy} from "./DeepProxy";

describe('DeepProxy', () => {
    it('should return default Proxy object', () => {
        const proxy = new DeepProxy({
            foo: 'foo',
            bar: 'bar',
            baz() { return 1 },
        }, {});
        expect(proxy.foo).toBe('foo');
        expect(proxy.bar).toBe('bar');
        expect(proxy.baz()).toBe(1);
        expect(proxy.baa).toBeUndefined();
    });

    it('should return overridden string by get trap', () => {
        const propxy = new DeepProxy({}, {
            get(target, key, reciever) {
                return (this.path.length === 1) ? 'foo everywhere!' : this.nest();
            }
        });
        expect(propxy.foo).toBeDefined();
        expect(propxy.bar.baz).toBe('foo everywhere!');
    });

    it('should return overridden string by apply trap', () => {
        const proxy = new DeepProxy(function () {}, {
            apply(target, thisArg, argumentsList) {
                return 'I was applied!';
            }
        });

        expect(proxy()).toBe('I was applied!');
    });

    it('should works correctly get and apply traps together', () => {
        const proxy = new DeepProxy(function () {}, {
            get() {
                return this.path;
            },
            apply(target, thisArg, argumentsList) {
                return this.nest(function () {});
            }
        });
        expect(proxy()()().foo).toEqual([]);
    });
});