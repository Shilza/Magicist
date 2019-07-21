import {PubSub} from "../utils";
import {equals} from "../utils/array/equals";
import {onlyData, createDeepSetProxy} from "../utils";

export class Store {
    private readonly model: Object;
    private static readonly WATCHERS = Symbol;

    /**
     * @param model {Object}
     * @param middlewares {Array}
     */
    constructor(model, middlewares: Array<Middleware> = []) {
        this.model = this.registerSetProxies({...model});
        this.registerMiddlewares(middlewares);
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
     * @returns disposer {Function}, which can be used to dispose of the watcher when you no longer need it.
     */
    watch(watcher: Function): Function {
        const token = PubSub.subscribe(this, () => watcher(onlyData(this.model)));
        return () => PubSub.unsubscribe(token);
    }

    /**
     * @description Method that apply callback when prop value is changed
     * @param watchedProp {string|Path} Can be a string or Path (Array<string>) for deep props
     * @param watcher {Function}
     * @returns disposer {Function}, which can be used to dispose of the watcher when you no longer need it.
     */
    watchProp(watchedProp: string | Path, watcher: (oldValue: any, newValue: any) => void): Function {
        const token = PubSub.subscribe(Store.WATCHERS, ([propPath, oldValue, newValue]) => {
            if ((Array.isArray(watchedProp) && equals(watchedProp, propPath) )
                || (typeof watchedProp === 'string' && propPath.length === 1 && propPath[0] === watchedProp))
                watcher(onlyData(oldValue), onlyData(newValue));
        });
        return () => PubSub.unsubscribe(token);
    }

    /**
     * @description Method that makes model's props observable
     * @param target {Object}
     */
    private registerSetProxies(target) {
        const store = this;
        return createDeepSetProxy(target, {
            set(target, path, newValue, oldValue) {
                if (newValue !== oldValue) {
                    PubSub.publish(store, path);
                    PubSub.publish(Store.WATCHERS, [path, oldValue, newValue]);
                }
            }
        });
    }

    /**
     * @description Method that sets middlewares before function apply
     * @param middlewares {Array}
     */
    private registerMiddlewares(middlewares: Array<Middleware>) {
        Object.entries(this.model).forEach(([key, value]) => {
            if (typeof value === 'function') {
                const functionsHandler: {} = {
                    apply: (func, args) => {
                        middlewares.forEach((middleware: Middleware) => middleware(onlyData(this.model), func, args));
                        func(args);
                    }
                };
                this.model[key] = new Proxy(value.bind(this.model), functionsHandler);
            }
        });
    }
}