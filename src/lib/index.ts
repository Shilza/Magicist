import {useCallback, useState} from 'react';
import {Store} from "./entities/Store";
import {PubSub} from './utils/PubSub';

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
            forceUpdate();
            PubSub.unsubscribe(token);
        }
    });

    return model;
};

/**
 * @description Create a store object that holds the state tree
 * @throws {TypeError} throws if store is not an object
 * @param model {Object}
 * @param middlewares {Array}
 * @returns {Store}
 */
export const createStore = (model: Object, middlewares: Array<middleware> = []): Store => {
    if (typeof model !== 'object')
        throw TypeError('store must be an object');

    return new Store(model, middlewares);
};

