// third party
import thunk from 'redux-thunk'
import { createWrapper, MakeStore } from "next-redux-wrapper";
import {
    applyMiddleware,
    legacy_createStore as createStore,
    Middleware,
    Store
} from 'redux'

// application
import rootReducer from '@/store/root/rootReducer';
import version from '@/store/version';

const STORAGE_KEY = 'tieuquetu/react';

export const save = (state) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
    }
}

export const load = () => {
    if (!process.browser) {
        return undefined
    }

    let state

    try {
        state = localStorage.getItem(STORAGE_KEY)

        if (typeof state === 'string') {
            state = JSON.parse(state)
        }

        if (state && state.version !== version) {
            state = undefined
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
    }

    return state || undefined
}

const bindMiddleware = (...middleware) => {
    if (process.env.NODE_ENV !== 'production'){
        // eslint-disable-next-line global-require
        const { composeWithDevTools } = require('redux-devtools-extension');

        return composeWithDevTools(applyMiddleware(...middleware));
    }

    return applyMiddleware(...middleware);
}

const makeStore = () => (
    createStore(rootReducer, bindMiddleware(thunk))
);

export const wrapper = createWrapper(makeStore);