/**
 * Class that provides Proxy for deep nested objects
 */
export class DeepProxy {
    // names of the traps that can be registered with ES6's Proxy object
    private static trapNames = [
        'getPrototypeOf',
        'setPrototypeOf',
        'isExtensible',
        'preventExtensions',
        'construct',
        'ownKeys',
        'get',
        'set',
        'deleteProperty',
        'enumerate',
        'has',
        'defineProperty',
        'getOwnPropertyDescriptor',
        'apply',
    ];

    // a list of paramer indexes that indicate that the a recieves a key at that parameter
    // this information will be used to update the path accordingly
    private static keys = {
        get: 1,
        set: 1,
        deleteProperty: 1,
        enumerate: 1,
        has: 1,
        defineProperty: 1,
        getOwnPropertyDescriptor: 1
    };

    private readonly rootTarget: Object;
    private readonly traps: Object;

    /**
     *
     * @param rootTarget {Object}
     * @param traps {Object}
     */
    constructor(rootTarget: Object, traps: Object) {
        this.rootTarget = rootTarget;
        this.traps = traps;

        // @ts-ignore
        return this.createProxy(rootTarget);
    }

    /**
     * Method thar creates Proxy
     * @param target {Object}
     * @param path {Array<String>}
     */
    createProxy(target: Object, path: Array<string> = []) {
        // avoid creating a new object between two traps
        const context = {rootTarget: this.rootTarget, path};

        let realTraps = {};

        for (const trapName of DeepProxy.trapNames) {
            const keyParamIdx = DeepProxy.keys[trapName];
            const trap = this.traps[trapName];

            if (typeof trap !== 'undefined') {
                const deepProxy = this;
                if (typeof keyParamIdx !== 'undefined') {
                    realTraps[trapName] = function () {
                        const key = arguments[keyParamIdx];

                        // update context for this trap
                        // @ts-ignore
                        context.nest = (nestedTarget?: Object = deepProxy.rootTarget) => {
                            return deepProxy.createProxy(nestedTarget, [...path, key]);
                        };

                        return trap.apply(context, arguments);
                    }
                } else {
                    realTraps[trapName] = function () {
                        // update context for this trap
                        // @ts-ignore
                        context.nest = (nestedTarget?: Object) => deepProxy.createProxy(nestedTarget, path);

                        return trap.apply(context, arguments);
                    }
                }
            }
        }

        return new Proxy(target, realTraps);
    }
}
