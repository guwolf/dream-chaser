export const createStore = (reducer, preloadedState, enhancer) => {
    // 初始化state
    let state = preloadedState;
    // 保存监听函数
    const listeners = [];
    // 返回store当前保存的state
    const getState = () => state;
    // 通过subscribe传入监听函数
    const subscribe = (listener) => {
        listeners.push(listener);
    }
    // 执行dispatch，通过reducer计算新的状态state
    // 并执行所有监听函数
    const dispatch = (action) => {
        state = reducer(state, action);
        for(const listener of listeners) {
            listener();
        }
    }
    !state && dispatch({});

    if(enhancer) {
        return enhancer(createStore)(reducer, preloadedState);
    }

    return {
        getState,
        dispatch,
        subscribe,
    }
}

export default createStore;

export const applyMiddleware = (...middlewares) => {
    return createStore => (reducer, preloadedState) => {
        const store = createStore(reducer, preloadedState);
        let dispatch = () => {
            throw new Error('xxxx');
        };
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        };
        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);
        return {
            ...store,
            dispatch
        }
    }
};

export const compose = (...funcs) => {
    if(funcs.length === 0) {
        return arg => arg;
    }
    if(funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((prev, cur) => {
        return (...args) => {
            prev(cur(...args));
         } 
     });
}