import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'remote-redux-devtools';
import {createReactNavigationReduxMiddleware} from "react-navigation-redux-helpers";


let middleware = [thunk];

let middlewareNav = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

if (__DEV__) {
    const _XHR = GLOBAL.originalXMLHttpRequest ?
        GLOBAL.originalXMLHttpRequest :
        GLOBAL.XMLHttpRequest;

    XMLHttpRequest = _XHR;

    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();

    middleware = [...middleware, middlewareNav, reduxImmutableStateInvariant, logger];
} else {

    middleware = [...middleware, middlewareNav];
}

export default function configureStore(initialState){
    return createStore(
        appReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )
}