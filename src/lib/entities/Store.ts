import {PubSub} from "../utils/PubSub";
import '../polyfills/watch';

export class Store {
    private readonly model: {
        watch: (key: string, handler: watchHandler) => void;
    };
    private static readonly WATCHERS = Symbol;

    /**
     * @param model {Object}
     * @param middlewares {Array}
     */
    constructor(model, middlewares: Array<middleware> = []) {
        this.model = model;
        this.registerMiddlewares(middlewares);
        this.registerWatchers();
    }

    /**
     * @description Return store's model
     */
    getModel() {
        return this.model;
    }

    /**
     * @description Method that apply callback when model is changed
     * @param watcher {Function}
     */
    watch(watcher: Function) {
        PubSub.subscribe(this, () => watcher(this.model));
    }

    /**
     * @description Method that apply callback when prop value is changed
     * @param propName {string}
     * @param watcher {Function}
     */
    watchProp(propName: string, watcher: (oldValue: any, newValue: any) => void) {
        PubSub.subscribe(Store.WATCHERS, ([prop, oldValue, newValue]) => {
            if(propName === prop)
                watcher(oldValue, newValue);
        });
    }

    /**
     * @description Method that makes model's props observable
     */
    private registerWatchers() {
        const watchHandler = (propName, oldValue, newValue) => {
            if (newValue !== oldValue) {
                PubSub.publish(this, propName);
                PubSub.publish(Store.WATCHERS, [propName, oldValue, newValue]);
            }
            return newValue;
        };

        Object.keys(this.model).forEach(key => {
            if(typeof key !== 'function')
                this.model.watch(key, watchHandler);
        });
    }

    /**
     * @description Method that sets middlewares before function apply
     * @param middlewares {Array}
     */
    private registerMiddlewares(middlewares: Array<middleware> = []) {
        Object.entries(this.model).forEach(([key, value]) => {
            if (typeof value === 'function') {
                const functionsHandler: {} = {
                    apply: (func, args) => {
                        middlewares.forEach((middleware: middleware) => middleware(this.model, func, args));
                        func(args);
                    }
                };
                this.model[key] = new Proxy(value.bind(this.model), functionsHandler);
            }
        });
    }
}