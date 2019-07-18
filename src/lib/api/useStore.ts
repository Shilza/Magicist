import {useState, useCallback} from "react";
import {PubSub} from "../utils";
import {Store} from "../entities";

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

    const observables: Array<string|number|symbol> = [];
    let model = new Proxy(store.getModel(), {
        get: function (target, prop) {
            if (typeof target[prop] !== 'function' && !observables.includes(prop))
                observables.push(prop);
            return target[prop];
        }
    });

    const token = PubSub.subscribe(store, propName => {
        if (observables.includes(propName)) {
            Promise.resolve().then(forceUpdate);
            PubSub.unsubscribe(token);
        }
    });

    return model;
};
