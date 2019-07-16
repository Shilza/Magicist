<img align="right" alt='Magicist logo' width="166" height="108" src="https://github.com/Shilza/Magicist/blob/master/public/readmeLogo.png" />

# Magicist
[![CircleCI](https://circleci.com/gh/Shilza/Magicist.svg?style=svg)](https://circleci.com/gh/Shilza/Magicist)
[![install size](https://packagephobia.now.sh/badge?p=magicist)](https://packagephobia.now.sh/result?p=magicist)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![License](https://img.shields.io/npm/l/magicist.svg?colorB=brightgreen&style=popout)


Extra simple state manager.
##### No need to think about details. Just write code

## Advantages


* Zero-dependency
* Tiny bundle size
* Boilerplate free
* React bindings out of the box
* Only point changes (you no longer need to reduce the state)
* With Magicist you don't need to normalize your data. This makes the library very suitable for very complex domain models
* No need classes
* No need immutable data structures
* No need middlewares for async actions

## Installation

Via yarn
```
yarn add magicist
```

Via npm 
```
npm install magicist --save
```

## Examples
### Increment/decrement
```javascript
import React from 'react';
import {createStore} from "magicist";
import {useStore} from "magicist";

export const counterStore = createStore({
    count: 0,
    increment: function () {
        this.count++;
    },
    decrement: function () {
        this.count--;
    },
    reset: function() {
        this.count = 0;
    }
});

const Counter = () => {
    let {count, increment, decrement, reset} = useStore(counterStore);

    return (
        <>
            <div>Counter {count}</div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </>
    );
};
```

## Demo
##### Basic 
[![Edit magicist-counter-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/magicist-counter-example-ktynt?fontsize=14)

## API
### createStore
`createStore(store, middlewares)` Create a store object that holds the state tree.

###### Arguments
1. `store`: object
2. `middlewares`: Array<(store: Store, func: (any) => any, args: Array<any>) => void>

###### Returns 
`Store` object that holds the state tree.

#### Example
```javascript
const store = createStore({
    someData: 100
});
```
#### middlewares

These are functions that intercept actions.
Middlewares are will be called before running the store functions.

Middleware function arguments: 
1. `model`: Model
2. `func`: Function
3. `args`: arguments to be passed in called function  

#### Example
```javascript
function logger(model, func, args) {
    console.log(model); // {someData: 100, manipulateData: (...)}
    console.log(func); // ƒ (receivedData) { return this.someData / receivedData; }
    console.log(args); // [100]
}

const middlewares = [logger];

const store = createStore({
    someData: 100,
    manipulateData: function(receivedData) {
        return this.someData / receivedData;
    }
}, middlewares);

store.getModel().manipulateData();
```

### useStore
`useStore(store)` Creates hook function, which subscribe to watcher, that observes changes in current store, so when recording results, the component will update automatically.

###### Arguments
1. `store`: Store (created by `createStore`)

###### Returns 
`Model`

#### Example
```javascript
let model = useStore(store);
```

### watch
`watch(watcher)` Triggers the callback when store is updated

###### Arguments
1. `watcher`: Function

###### Returns 
`unwatch` function than unsubscribe watcher 

#### Example

```javascript
const globalStore = createStore({
    count: 0,
    increment: function () {
        this.count++;
    }
});

const watcher = model => console.log(model);
const unwatch = globalStore.watch(watcher); // { count: 1, increment: (...) }

globalStore.getModel().increment();
unwatch(); // unsubscribe from updates
```

### watchProp
`watchProp(propName, watcher)` Triggers the callback when store's prop is updated

###### Arguments
1. `watcher`: (oldValue, newValue) => void

###### Returns 
`unwatch` function than unsubscribe watcher 

#### Example

```javascript
const globalStore = createStore({
    count: 0,
    increment: function () {
        this.count++;
    }
});

const watcher = (oldValue, newValue) => console.log(oldValue, newValue);
const unwatch = globalStore.watchProp('count', watcher); // 0, 1

globalStore.getModel().increment();
unwatch(); // unsubscribe from updates
```
## What will Magicist react to?
Magicist reacts to any existing observable property that is read during the execution of a tracked function.

## Contributing

* Feel free to send pull requests.
* Use `yarn test` to run the basic test suite.
