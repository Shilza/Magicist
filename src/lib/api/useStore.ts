import {useState, useCallback} from "react";
import {PubSub, DeepProxy} from "../utils";
import {Store} from "../entities";
import {includes} from "../utils/array/includes";

const setValueByPath = (path, key, value) => {
    path.forEach(item => {
        value = value[item];
    });
    Object.entries(value).forEach(([k, v]) => {
        if(k === key)
            value = v;
    });

    return value;
};


/**
 * @description Creates hook function, which subscribe to watcher, that observes changes in current store
 * @throws {TypeError} throws if store does not created by createStore
 * @param store {Store}
 * @returns {Object}
 */
export const useStore = (store: Store) => {
    if (!(store instanceof Store))
        throw TypeError('store does not created by createStore');

    const [, updateState] = useState(null);
    // @ts-ignore
    const forceUpdate = useCallback(() => updateState({}), []);

    const observables: Array<string|number|symbol|Array<string|number|symbol>> = [];

    const model = new DeepProxy(store.getModel(), {
        get(target, key) {
            let value = target;
            // @ts-ignore
            value = setValueByPath(this.path, key, value);

            if (typeof value === 'object' && value !== null) {
                // @ts-ignore
                return this.nest();
            } else {
                if (typeof value !== 'function' && !observables.includes(key))
                // @ts-ignore
                    observables.push([...this.path, key]);

                return value;
            }
        }
    });

    const token = PubSub.subscribe(store, propPath => {
        if (includes(observables, propPath)) {
            Promise.resolve().then(forceUpdate);
            PubSub.unsubscribe(token);
        }
    });

    return model;
};
