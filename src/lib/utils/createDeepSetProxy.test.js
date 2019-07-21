import {createDeepSetProxy} from "./createDeepSetProxy";

describe('createDeepSetProxy', () => {
    it('deep value updating should works', () => {
        const target = {
            obj: {
                value: 500
            }
        };
        const proxy = createDeepSetProxy(target, {
            set(target, path, newValue, oldValue) {
                expect(newValue).toBe(400);
            }
        });
        proxy.obj.value = 400;
    });

    it('deep object updating should works', () => {
        const target = {
            obj: {
                value: 500
            }
        };
        const newObj = {
            val: 500
        };
        const proxy = createDeepSetProxy(target, {
            set(target, path, newValue, oldValue) {
                expect(newValue).toEqual(newObj);
            }
        });
        proxy.obj = newObj;
    });
});