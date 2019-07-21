/**
 * Function that creates Proxy for deep nested objects with the set trap
 * @param target {Object}
 * @param handler {Object}
 */
export function createDeepSetProxy(target: Object, handler: {set: Function}) {
    const preProxy = new WeakMap();

    /**
     * Function that makes proxy handler by path
     * @param path {Array<String>}
     */
    function makeHandler(path: Array<string>) {
        return {
            set(target, key, value, receiver) {
                if (typeof value === 'object')
                    value = proxify(value, [...path, key]);
                const oldValue = target[key];

                target[key] = value;
                handler.set(target, [...path, key], value, oldValue, receiver);

                return true;
            }
        }
    }

    /**
     * Function that makes proxy
     * @param obj {Object}
     * @param path {Array<String>}
     */
    function proxify(obj: Object, path: Array<string>) {
        for (let key of Object.keys(obj))
            if (typeof obj[key] === 'object')
                obj[key] = proxify(obj[key], [...path, key]);

        let proxy = new Proxy(obj, makeHandler(path));
        preProxy.set(proxy, obj);

        return proxy;
    }

    return proxify(target, []);
}