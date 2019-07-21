import {Store} from "../entities";

/**
 * @description Create a store object that holds the state tree
 * @throws {TypeError} throws if store is not an object
 * @param model {Object}
 * @param middlewares {Array<Function>}
 * @returns {Store}
 */
export const createStore = (model: Object, middlewares: Array<Middleware> = []): Store => {
    if (typeof model !== 'object')
        throw TypeError('store must be an object');
    if(!Array.isArray(middlewares))
        throw TypeError('middlewares must be an array');
    if(middlewares.some(middleware => typeof middleware !== 'function'))
        throw TypeError('Middlewares array must contain only functions');

    return new Store(model, middlewares);
};