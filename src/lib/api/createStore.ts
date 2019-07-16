import {Store} from "../entities";

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