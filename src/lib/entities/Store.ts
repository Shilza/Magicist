import {uuidv4} from "../utils/uuidv4";
import {PubSub} from "../utils/PubSub";
import '../polyfills/watch';

export class Store {
    public id: string;
    public observedState: {
        watch: (key: string, handler: watchHandler) => void;
    };

    /**
     * @param observedState {Object}
     * @param middlewares {Array}
     */
    constructor(observedState, middlewares: Array<middleware> = []) {
        this.id = uuidv4();
        this.observedState = observedState;
        this.registerMiddlewares(middlewares);
        this.registerWatchers();
    }

    /**
     * Method that makes observedState's props observable
     */
    private registerWatchers() {
        const watchHandler = (propName, oldValue, newValue) => {
            if (newValue !== oldValue)
                PubSub.publish(this.id, propName);
            return newValue;
        };

        Object.keys(this.observedState).forEach(key => {
            this.observedState.watch(key, watchHandler);
        });
    }

    /**
     * @description Method that sets middlewares before function apply
     * @param middlewares {Array}
     */
    private registerMiddlewares(middlewares: Array<middleware> = []) {
        Object.entries(this.observedState).forEach(([key, value]) => {
            if (typeof value === 'function') {
                const functionsHandler: {} = {
                    apply: (func, args) => {
                        middlewares.forEach((middleware: any) => middleware(this.observedState, func, args));
                        func(args);
                    }
                };
                this.observedState[key] = new Proxy(value.bind(this.observedState), functionsHandler);
            }
        });
    }
}