import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'remote-redux-devtools';


let middleware = [thunk];

if (__DEV__) {
    const _XHR = GLOBAL.originalXMLHttpRequest ?
        GLOBAL.originalXMLHttpRequest :
        GLOBAL.XMLHttpRequest;

    XMLHttpRequest = _XHR;

    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
    middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
    middleware = [...middleware];
}

export default function configureStore(initialState){
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )
}