import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'remote-redux-devtools';
import {createReactNavigationReduxMiddleware} from "react-navigation-redux-helpers";


let middleware = [thunk];

if (__DEV__) {
    const _XHR = GLOBAL.originalXMLHttpRequest ?
        GLOBAL.originalXMLHttpRequest :
        GLOBAL.XMLHttpRequest;

    XMLHttpRequest = _XHR;

    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();

    console.log('-------------------------1111111---------------------------');
    let middlewareNav = createReactNavigationReduxMiddleware(
        "root",
        state => state.nav,
    );
    middleware = [...middleware, middlewareNav, reduxImmutableStateInvariant, logger];
} else {
    middleware = [...middleware];
}

export default function configureStore(initialState){
    return createStore(
        appReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )
}